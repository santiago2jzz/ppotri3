const express = require('express');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


const dbPath = path.join(__dirname, 'database.sqlite');
const sqlPath = path.join(__dirname, 'database.sql');

const db = new Database(dbPath);

db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');


const sql = fs.readFileSync(sqlPath, 'utf8');
db.exec(sql);

console.log('Banco de dados conectado.');


app.use(express.json());


app.use((req, res, next) => {
    const file = path.basename(req.path).toLowerCase();

    if (
        file === 'server.js' ||
        file === 'database.sql' ||
        file === 'package.json' ||
        file === 'package-lock.json' ||
        file.endsWith('.sqlite') ||
        file.endsWith('.db') ||
        file.endsWith('.sql') ||
        req.path.startsWith('/node_modules/')
    ) {
        return res.sendStatus(404);
    }

    next();
});


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
            LEFT JOIN circuits
                ON races.circuit_id = circuits.id
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
            LEFT JOIN circuits
                ON races.circuit_id = circuits.id
            ORDER BY races.season DESC, races.round
        `).all();
    }

    res.json(races);
});


app.get('/api/results/:raceId', (req, res) => {
    const raceId = Number(req.params.raceId);

    if (!Number.isInteger(raceId) || raceId <= 0) {
        return res.status(400).json({
            error: 'ID de corrida inválido'
        });
    }

    const results = db.prepare(`
        SELECT
            race_results.*,
            drivers.name AS driver_name,
            drivers.abbreviation,
            teams.name AS team_name
        FROM race_results
        JOIN drivers
            ON race_results.driver_id = drivers.id
        LEFT JOIN teams
            ON drivers.team_id = teams.id
        WHERE race_results.race_id = ?
        ORDER BY race_results.final_position
    `).all(raceId);

    res.json(results);
});



app.use(express.static(__dirname));


app.use((req, res) => {
    res.status(404).send('Página não encontrada.');
});


app.listen(PORT, '127.0.0.1', () => {
    console.log(' F1 RACE COMPANION');
    console.log(' Servidor iniciado.');
    console.log(` http://localhost:${PORT}`);
});