const express = require('express');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();

// O site usa a porta 3001. O Live Timing continua na porta 3000.
const PORT = 3001;
const HORAS_SESSAO = 8;

const dbPath = path.join(__dirname, 'database.sqlite');
const sqlPath = path.join(__dirname, 'database.sql');
const usuariosDbPath = path.join(__dirname, 'usuarios.sqlite');
const usuariosSqlPath = path.join(__dirname, 'usuarios.sql');
const segredoPath = path.join(__dirname, 'session.secret');

// Banco original do projeto: equipes, pilotos, circuitos e corridas.
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');
db.exec(fs.readFileSync(sqlPath, 'utf8'));

// Banco separado e exclusivo para contas de usuário.
const usuariosDb = new Database(usuariosDbPath);
usuariosDb.pragma('journal_mode = WAL');
usuariosDb.exec(fs.readFileSync(usuariosSqlPath, 'utf8'));

// Cria uma chave local para assinar os cookies de autenticação.
if (!fs.existsSync(segredoPath)) {
    fs.writeFileSync(segredoPath, crypto.randomBytes(48), { flag: 'wx' });
}
const SESSION_SECRET = fs.readFileSync(segredoPath);

app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));

function criarHashSenha(senha) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(senha, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

function conferirSenha(senha, senhaArmazenada) {
    try {
        const [salt, hashArmazenado] = senhaArmazenada.split(':');
        if (!salt || !hashArmazenado) return false;

        const hashRecebido = crypto.scryptSync(senha, salt, 64);
        const hashOriginal = Buffer.from(hashArmazenado, 'hex');

        return hashRecebido.length === hashOriginal.length &&
            crypto.timingSafeEqual(hashRecebido, hashOriginal);
    } catch {
        return false;
    }
}

function criarToken(usuario) {
    const payload = Buffer.from(JSON.stringify({
        id: usuario.id,
        usuario: usuario.usuario,
        exp: Date.now() + HORAS_SESSAO * 60 * 60 * 1000
    })).toString('base64url');

    const assinatura = crypto
        .createHmac('sha256', SESSION_SECRET)
        .update(payload)
        .digest('base64url');

    return `${payload}.${assinatura}`;
}

function lerCookie(req, nome) {
    const cookies = (req.headers.cookie || '').split(';');

    for (const item of cookies) {
        const separador = item.indexOf('=');
        if (separador === -1) continue;

        const chave = item.slice(0, separador).trim();
        const valor = item.slice(separador + 1).trim();

        if (chave === nome) return valor;
    }

    return null;
}

function obterUsuario(req) {
    const token = lerCookie(req, 'f1_session');
    if (!token) return null;

    const partes = token.split('.');
    if (partes.length !== 2) return null;

    const [payload, assinaturaRecebida] = partes;
    const assinaturaEsperada = crypto
        .createHmac('sha256', SESSION_SECRET)
        .update(payload)
        .digest();

    let assinaturaBuffer;
    try {
        assinaturaBuffer = Buffer.from(assinaturaRecebida, 'base64url');
    } catch {
        return null;
    }

    if (
        assinaturaBuffer.length !== assinaturaEsperada.length ||
        !crypto.timingSafeEqual(assinaturaBuffer, assinaturaEsperada)
    ) {
        return null;
    }

    try {
        const dados = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));

        if (!dados.id || !dados.usuario || !dados.exp || Date.now() > dados.exp) {
            return null;
        }

        return dados;
    } catch {
        return null;
    }
}

function definirCookie(res, usuario) {
    const token = criarToken(usuario);
    res.setHeader(
        'Set-Cookie',
        `f1_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${HORAS_SESSAO * 60 * 60}`
    );
}

function limparCookie(res) {
    res.setHeader(
        'Set-Cookie',
        'f1_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0'
    );
}

function protegerPagina(req, res, next) {
    req.usuario = obterUsuario(req);

    if (!req.usuario) {
        return res.redirect('/login.html');
    }

    next();
}

function protegerApi(req, res, next) {
    req.usuario = obterUsuario(req);

    if (!req.usuario) {
        return res.status(401).json({ erro: 'Faça login para continuar.' });
    }

    next();
}

// -------------------- LOGIN E CADASTRO --------------------

app.get('/login.html', (req, res) => {
    if (obterUsuario(req)) return res.redirect('/');
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.css'));
});

app.get('/login.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.js'));
});

app.post('/api/cadastro', (req, res) => {
    const usuario = String(req.body?.usuario || '').trim();
    const senha = String(req.body?.senha || '');

    if (!/^[a-zA-Z0-9_.-]{3,24}$/.test(usuario)) {
        return res.status(400).json({
            erro: 'O usuário deve ter de 3 a 24 caracteres: letras, números, ponto, hífen ou underline.'
        });
    }

    if (senha.length < 8 || senha.length > 128) {
        return res.status(400).json({
            erro: 'A senha deve ter entre 8 e 128 caracteres.'
        });
    }

    try {
        const senhaHash = criarHashSenha(senha);
        const resultado = usuariosDb.prepare(
            'INSERT INTO usuarios (usuario, senha_hash) VALUES (?, ?)'
        ).run(usuario, senhaHash);

        const novoUsuario = { id: Number(resultado.lastInsertRowid), usuario };
        definirCookie(res, novoUsuario);

        return res.status(201).json({
            mensagem: 'Conta criada com sucesso.',
            usuario: { nome: usuario }
        });
    } catch (erro) {
        if (erro.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({ erro: 'Esse nome de usuário já está em uso.' });
        }

        console.error('Erro no cadastro:', erro);
        return res.status(500).json({ erro: 'Não foi possível criar a conta.' });
    }
});

app.post('/api/login', (req, res) => {
    const usuario = String(req.body?.usuario || '').trim();
    const senha = String(req.body?.senha || '');

    if (!usuario || !senha) {
        return res.status(400).json({ erro: 'Informe usuário e senha.' });
    }

    const conta = usuariosDb.prepare(
        'SELECT id, usuario, senha_hash FROM usuarios WHERE usuario = ? COLLATE NOCASE'
    ).get(usuario);

    if (!conta || !conferirSenha(senha, conta.senha_hash)) {
        return res.status(401).json({ erro: 'Usuário ou senha incorretos.' });
    }

    definirCookie(res, conta);

    return res.json({
        mensagem: 'Login realizado com sucesso.',
        usuario: { nome: conta.usuario }
    });
});

app.post('/api/logout', (req, res) => {
    limparCookie(res);
    res.json({ mensagem: 'Sessão encerrada.' });
});

app.get('/api/usuario', protegerApi, (req, res) => {
    res.json({
        usuario: {
            id: req.usuario.id,
            nome: req.usuario.usuario
        }
    });
});

// A partir daqui, as rotas da aplicação exigem autenticação.
app.use('/api', protegerApi);

// -------------------- ROTAS ORIGINAIS DO PROJETO --------------------

app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        project: 'F1 Race Companion'
    });
});

app.get('/api/drivers', (req, res) => {
    const drivers = db.prepare(`
        SELECT
            drivers.*,
            teams.name AS team_name,
            teams.color AS team_color
        FROM drivers
        LEFT JOIN teams ON drivers.team_id = teams.id
        ORDER BY drivers.number
    `).all();

    res.json(drivers);
});

app.get('/api/races', (req, res) => {
    const season = req.query.season;
    let races;

    if (season) {
        races = db.prepare(`
            SELECT
                races.*,
                circuits.name AS circuit_name,
                circuits.country
            FROM races
            LEFT JOIN circuits ON races.circuit_id = circuits.id
            WHERE races.season = ?
            ORDER BY races.round
        `).all(season);
    } else {
        races = db.prepare(`
            SELECT
                races.*,
                circuits.name AS circuit_name,
                circuits.country
            FROM races
            LEFT JOIN circuits ON races.circuit_id = circuits.id
            ORDER BY races.season DESC, races.round
        `).all();
    }

    res.json(races);
});

app.get('/api/results/:raceId', (req, res) => {
    const raceId = Number(req.params.raceId);

    if (!Number.isInteger(raceId) || raceId <= 0) {
        return res.status(400).json({ error: 'ID de corrida inválido' });
    }

    const results = db.prepare(`
        SELECT
            race_results.*,
            drivers.name AS driver_name,
            drivers.abbreviation,
            teams.name AS team_name
        FROM race_results
        JOIN drivers ON race_results.driver_id = drivers.id
        LEFT JOIN teams ON drivers.team_id = teams.id
        WHERE race_results.race_id = ?
        ORDER BY race_results.final_position
    `).all(raceId);

    res.json(results);
});

// O HTML e seus arquivos só são entregues após autenticação.
app.get('/', protegerPagina, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', protegerPagina, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/main.js', protegerPagina, (req, res) => {
    res.sendFile(path.join(__dirname, 'main.js'));
});

app.get('/styles.css', protegerPagina, (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.use((req, res) => {
    res.status(404).send('Página não encontrada.');
});

app.listen(PORT, '127.0.0.1', () => {
    console.log('F1 RACE COMPANION');
    console.log('Servidor do site iniciado.');
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log('O Live Timing deve continuar ativo na porta 3000.');
});
