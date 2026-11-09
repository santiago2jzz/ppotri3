const calendario2026 = [
    { rodada: 1, nome: "GP da Austrália", gp: "Formula 1 Australian Grand Prix", circuito: "Albert Park Grand Prix Circuit", local: "Melbourne, Austrália", inicio: "2026-03-06", fim: "2026-03-08" },
    { rodada: 2, nome: "GP da China", gp: "Formula 1 Chinese Grand Prix", circuito: "Shanghai International Circuit", local: "Xangai, China", inicio: "2026-03-13", fim: "2026-03-15" },
    { rodada: 3, nome: "GP do Japão", gp: "Formula 1 Japanese Grand Prix", circuito: "Suzuka International Racing Course", local: "Suzuka, Japão", inicio: "2026-03-27", fim: "2026-03-29" },
    { rodada: 4, nome: "GP de Miami", gp: "Formula 1 Miami Grand Prix", circuito: "Miami International Autodrome", local: "Miami, Estados Unidos", inicio: "2026-05-01", fim: "2026-05-03" },
    { rodada: 5, nome: "GP do Canadá", gp: "Formula 1 Canadian Grand Prix", circuito: "Circuit Gilles-Villeneuve", local: "Montreal, Canadá", inicio: "2026-05-22", fim: "2026-05-24" },
    { rodada: 6, nome: "GP de Mônaco", gp: "Formula 1 Monaco Grand Prix", circuito: "Circuit de Monaco", local: "Monte Carlo, Mônaco", inicio: "2026-06-05", fim: "2026-06-07" },
    { rodada: 7, nome: "GP da Espanha", gp: "Formula 1 Spanish Grand Prix", circuito: "Circuit de Barcelona-Catalunya", local: "Barcelona, Espanha", inicio: "2026-06-12", fim: "2026-06-14" },
    { rodada: 8, nome: "GP da Áustria", gp: "Formula 1 Austrian Grand Prix", circuito: "Red Bull Ring", local: "Spielberg, Áustria", inicio: "2026-06-26", fim: "2026-06-28" },
    { rodada: 9, nome: "GP da Grã-Bretanha", gp: "Formula 1 British Grand Prix", circuito: "Silverstone Circuit", local: "Silverstone, Reino Unido", inicio: "2026-07-03", fim: "2026-07-05" },
    { rodada: 10, nome: "GP da Bélgica", gp: "Formula 1 Belgian Grand Prix", circuito: "Circuit de Spa-Francorchamps", local: "Spa-Francorchamps, Bélgica", inicio: "2026-07-17", fim: "2026-07-19" },
    { rodada: 11, nome: "GP da Hungria", gp: "Formula 1 Hungarian Grand Prix", circuito: "Hungaroring", local: "Budapeste, Hungria", inicio: "2026-07-24", fim: "2026-07-26" },
    { rodada: 12, nome: "GP dos Países Baixos", gp: "Formula 1 Dutch Grand Prix", circuito: "Circuit Zandvoort", local: "Zandvoort, Países Baixos", inicio: "2026-08-21", fim: "2026-08-23" },
    { rodada: 13, nome: "GP da Itália", gp: "Formula 1 Italian Grand Prix", circuito: "Autodromo Nazionale Monza", local: "Monza, Itália", inicio: "2026-09-04", fim: "2026-09-06", vencedor: "Kimi Antonelli" },
    { rodada: 14, nome: "GP da Espanha", gp: "Formula 1 Spanish Grand Prix", circuito: "Madrid IFEMA", local: "Madrid, Espanha", inicio: "2026-09-11", fim: "2026-09-13", vencedor: "Kimi Antonelli" },
    { rodada: 15, nome: "GP do Azerbaijão", gp: "Formula 1 Azerbaijan Grand Prix", circuito: "Baku City Circuit", local: "Baku, Azerbaijão", inicio: "2026-09-24", fim: "2026-09-26", vencedor: "George Russell" },
    { rodada: 16, nome: "GP do Bahrein", gp: "Formula 1 Gulf Air Bahrain Grand Prix", circuito: "Sepang International Circuit", local: "Kuala Lumpur, Malásia", inicio: "2026-10-02", fim: "2026-10-04" },
    { rodada: 17, nome: "GP de Singapura", gp: "Formula 1 Singapore Grand Prix", circuito: "Marina Bay Street Circuit", local: "Singapura", inicio: "2026-10-09", fim: "2026-10-11" },
    { rodada: 18, nome: "GP dos Estados Unidos", gp: "Formula 1 United States Grand Prix", circuito: "Circuit of the Americas", local: "Austin, Estados Unidos", inicio: "2026-10-23", fim: "2026-10-25", vencedor: "Kimi Antonelli" },
    { rodada: 19, nome: "GP da Cidade do México", gp: "Formula 1 Mexico City Grand Prix", circuito: "Autódromo Hermanos Rodríguez", local: "Cidade do México, México", inicio: "2026-10-30", fim: "2026-11-01", vencedor: "Max Verstappen" },
    { rodada: 20, nome: "GP de São Paulo", gp: "Formula 1 São Paulo Grand Prix", circuito: "Autódromo José Carlos Pace", local: "São Paulo, Brasil", inicio: "2026-11-06", fim: "2026-11-08", vencedor: "Lando Norris" },
    { rodada: 21, nome: "GP de Las Vegas", gp: "Formula 1 Las Vegas Grand Prix", circuito: "Las Vegas Strip Circuit", local: "Las Vegas, Estados Unidos", inicio: "2026-11-20", fim: "2026-11-22" },
    { rodada: 22, nome: "GP do Catar", gp: "Formula 1 Qatar Grand Prix", circuito: "Lusail International Circuit", local: "Lusail, Catar", inicio: "2026-11-27", fim: "2026-11-29" },
    { rodada: 23, nome: "GP de Abu Dhabi", gp: "Formula 1 Abu Dhabi Grand Prix", circuito: "Yas Marina Circuit", local: "Abu Dhabi, Emirados Árabes Unidos", inicio: "2026-12-04", fim: "2026-12-06" }
];


function formatarDataCalendario(inicio, fim) {
    const a = new Date(inicio + "T00:00:00");
    const b = new Date(fim + "T00:00:00");
    const opcoes = { day: "2-digit", month: "2-digit" };
    return a.toLocaleDateString("pt-BR", opcoes) + " — " + b.toLocaleDateString("pt-BR", opcoes) + " de 2026";
}


function renderizarCalendario() {
    const hoje = new Date();
    const container = document.getElementById("calendarioDinamico");
    const atual = document.getElementById("corridaAtual");
    const atualNome = document.getElementById("corridaAtualNome");
    const atualCircuito = document.getElementById("corridaAtualCircuito");
    const atualData = document.getElementById("corridaAtualData");

    const etapaAtual = calendario2026.find(corrida => {
        const inicio = new Date(corrida.inicio + "T00:00:00");
        const fim = new Date(corrida.fim + "T23:59:59");
        return hoje >= inicio && hoje <= fim;
    });

    if (etapaAtual) {
        atual.classList.add("ativa");
        atualNome.textContent = etapaAtual.nome;
        atualCircuito.textContent = etapaAtual.circuito + " · " + etapaAtual.local;
        atualData.textContent = "ROUND " + etapaAtual.rodada + " · " + formatarDataCalendario(etapaAtual.inicio, etapaAtual.fim);
    } else {
        atual.classList.remove("ativa");
    }


    const indiceAtual = etapaAtual
        ? calendario2026.indexOf(etapaAtual)
        : -1;

    const indicePrimeiraProxima = etapaAtual
        ? indiceAtual + 1
        : calendario2026.findIndex(corrida =>
            new Date(corrida.inicio + "T00:00:00") > hoje
        );

    const proximas = calendario2026.slice(
        indicePrimeiraProxima,
        indicePrimeiraProxima + 3
    );


    const encerradas = calendario2026
        .filter(corrida => new Date(corrida.fim + "T23:59:59") < hoje)
        .slice(-3)
        .reverse();

    container.innerHTML = `
                <div class="calendario-grupo">
                    <div class="section-header">
                        <div>
                            <h2>Próximas corridas</h2>
                            <div class="linha-vermelha"></div>
                        </div>
                    </div>
                    <div class="corridas">
                        ${proximas.map(corrida => criarCardCalendario(corrida, "PRÓXIMA", "proxima")).join("")}
                    </div>
                </div>
                <div class="calendario-grupo">
                    <div class="section-header">
                        <div>
                            <h2>Últimas corridas</h2>
                            <div class="linha-vermelha"></div>
                        </div>
                    </div>
                    <div class="corridas">
                        ${encerradas.map(corrida => criarCardCalendario(corrida, "ENCERRADA", "anterior")).join("")}
                    </div>
                </div>
            `;
}


function criarCardCalendario(corrida, status, classeStatus) {
    return `
                <div class="corrida">
                    <div class="info-label">ROUND ${corrida.rodada}</div>
                    <h3>${corrida.nome}</h3>
                    <div class="gp">${corrida.gp}</div>
                    <div class="info-label">Circuito</div>
                    <div class="circuito">${corrida.circuito}</div>
                    <div class="info-label">Local</div>
                    <div class="local">${corrida.local}</div>
                    <div class="info-label">Data</div>
                    <div class="data">${formatarDataCalendario(corrida.inicio, corrida.fim)}</div>
                    ${corrida.vencedor ? `<div class="vencedor-corrida">Vencedor: ${corrida.vencedor}</div>` : ""}
                    <span class="status-corrida ${classeStatus}">${status}</span>
                </div>
            `;
}

function abrirLiveTiming() {

    document
        .getElementById("paginaInicio")
        .classList.remove("ativa");

    document
        .getElementById("paginaLive")
        .classList.add("ativa");
    atualizar();

}


function voltarInicio() {

    document
        .getElementById("paginaLive")
        .classList.remove("ativa");

    document
        .getElementById("paginaInicio")
        .classList.add("ativa");
}


function abrirAba(aba) {

    const classificacao =
        document.getElementById(
            "conteudoClassificacao"
        );

    const stints =
        document.getElementById(
            "conteudoStints"
        );

    const botaoClassificacao =
        document.getElementById(
            "abaClassificacao"
        );

    const botaoStints =
        document.getElementById(
            "abaStints"
        );

    classificacao.classList.remove("ativa");
    stints.classList.remove("ativa");
    botaoClassificacao.classList.remove("ativa");
    botaoStints.classList.remove("ativa");


    if (aba === "stints") {

        stints.classList.add("ativa");
        botaoStints.classList.add("ativa");

        atualizarStints();

    } else {

        classificacao.classList.add("ativa");
        botaoClassificacao.classList.add("ativa");

    }

}


function classePneu(compound) {

    if (!compound) {
        return "pneu-desconhecido";
    }

    const pneu =
        compound
            .toString()
            .toUpperCase();

    if (pneu.includes("SOFT")) {
        return "pneu-soft";
    }

    if (pneu.includes("MEDIUM")) {
        return "pneu-medium";
    }

    if (pneu.includes("HARD")) {
        return "pneu-hard";
    }

    if (
        pneu.includes("INTERMEDIATE") ||
        pneu.includes("INTERMEDI")
    ) {
        return "pneu-intermediate";
    }

    if (pneu.includes("WET")) {
        return "pneu-wet";
    }

    return "pneu-desconhecido";

}


function nomePneu(compound) {

    if (!compound) {
        return "SEM DADO";
    }

    const pneu =
        compound
            .toString()
            .toUpperCase();

    if (pneu.includes("SOFT")) {
        return "SOFT";
    }

    if (pneu.includes("MEDIUM")) {
        return "MEDIUM";
    }

    if (pneu.includes("HARD")) {
        return "HARD";
    }

    if (
        pneu.includes("INTERMEDIATE") ||
        pneu.includes("INTERMEDI")
    ) {
        return "INTERMEDIÁRIO";
    }

    if (pneu.includes("WET")) {
        return "WET";
    }

    return compound;

}


function obterPneuAtual(linhaStints) {

    if (
        !linhaStints ||
        !Array.isArray(linhaStints.Stints) ||
        linhaStints.Stints.length === 0
    ) {
        return null;
    }

    return linhaStints.Stints[
        linhaStints.Stints.length - 1
    ];

}


let dadosStints = null;


function converterTempoParaMs(tempo) {

    if (!tempo) {
        return Infinity;
    }

    const texto =
        tempo
            .toString()
            .trim();

    const partes =
        texto.split(":");


    if (partes.length === 2) {

        const minutos =
            Number(partes[0]);

        const segundos =
            Number(partes[1]);

        if (
            Number.isNaN(minutos) ||
            Number.isNaN(segundos)
        ) {
            return Infinity;
        }

        return (
            minutos * 60000 +
            segundos * 1000
        );

    }


    const segundos =
        Number(texto);


    if (Number.isNaN(segundos)) {
        return Infinity;
    }


    return segundos * 1000;

}


function obterGapPiloto(piloto, dados) {

    if (!piloto) {
        return "—";
    }

    const tipoSessao = textoNormalizado(window.tipoSessaoAtual || "");
    const naoEhCorrida =
        tipoSessao.includes("practice") ||
        tipoSessao.includes("qualifying") ||
        tipoSessao.includes("qualification") ||
        tipoSessao.includes("shootout") ||
        tipoSessao.includes("sprint qualifying");

    if (naoEhCorrida) {
        const tempos = (dados?.Leaderboard || [])
            .map(numero => dados?.Lines?.[numero]?.BestLapTime?.Value)
            .filter(Boolean)
            .map(valor => ({
                texto: valor,
                ms: converterTempoParaMs(valor)
            }))
            .filter(item => Number.isFinite(item.ms));

        if (!tempos.length) {
            return "—";
        }

        const melhorTempo = Math.min(...tempos.map(item => item.ms));
        const tempoPiloto = converterTempoParaMs(piloto?.BestLapTime?.Value);

        if (!Number.isFinite(tempoPiloto)) {
            return "—";
        }

        const diferencaMs = Math.max(0, tempoPiloto - melhorTempo);

        if (diferencaMs === 0) {
            return "LÍDER";
        }

        return "+" + (diferencaMs / 1000).toFixed(3);
    }

    const gap = piloto.GapToLeader;

    if (gap && typeof gap === "object" && gap.Value) {
        return gap.Value;
    }

    if (gap && typeof gap !== "object") {
        return gap;
    }

    return "—";
}


function encontrarMelhorVolta(dados) {

    if (
        !dados ||
        !dados.Leaderboard ||
        !dados.Lines
    ) {
        return null;
    }


    let melhor = null;


    dados.Leaderboard.forEach(numero => {

        const piloto =
            dados.Lines[numero];


        if (
            !piloto ||
            piloto.Retired ||
            !piloto.BestLapTime ||
            !piloto.BestLapTime.Value
        ) {
            return;
        }


        const tempo =
            piloto.BestLapTime.Value;


        const tempoMs =
            converterTempoParaMs(tempo);


        if (
            tempoMs === Infinity
        ) {
            return;
        }


        if (
            !melhor ||
            tempoMs < melhor.tempoMs
        ) {

            melhor = {
                numero: numero,
                tempo: tempo,
                tempoMs: tempoMs,
                piloto: piloto
            };

        }

    });


    return melhor;

}


function textoNormalizado(valor) {

    return (valor || "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


function obterStatusPiloto(piloto) {

    if (!piloto) {
        return "";
    }

    const status = textoNormalizado(piloto.Status);

    if (piloto.Retired || piloto.Stopped) {
        return "DNF";
    }

    if (
        status === "dns" ||
        status.includes("did not start") ||
        status.includes("not started")
    ) {
        return "DNS";
    }

    if (
        piloto.InPit ||
        status.includes("pit") ||
        status.includes("box")
    ) {
        return "BOX";
    }

    return "NA PISTA";
}


function classeStatusPiloto(status) {

    if (status === "DNF") {
        return "status-dnf";
    }

    if (status === "DNS") {
        return "status-dns";
    }

    if (status === "BOX") {
        return "status-box";
    }

    return "status-ativo";
}


function traduzirStatusSessao(status, dados) {

    const texto = textoNormalizado(status);
    const completo = texto + " " + textoNormalizado(JSON.stringify(dados));

    if (
        completo.includes("started") ||
        completo.includes("active") ||
        completo.includes("running") ||
        completo.includes("racing") ||
        completo.includes("live") ||
        completo.includes("inprogress") ||
        completo.includes("in progress")
    ) {
        return "AO VIVO";
    }

    if (
        completo.includes("finished") ||
        completo.includes("completed") ||
        completo.includes("ended") ||
        completo.includes("finalised") ||
        completo.includes("finalized")
    ) {
        return "Finalizado";
    }

    if (
        completo.includes("scheduled") ||
        completo.includes("notstarted") ||
        completo.includes("not started")
    ) {
        return "AGUARDANDO INÍCIO";
    }

    return "AGUARDANDO";
}


function traduzirTipoSessao(tipo) {

    const texto = textoNormalizado(tipo);

    if (texto.includes("practice") || texto.includes("treino")) {
        return "Treino Livre";
    }

    if (texto.includes("qualifying") || texto.includes("qualification")) {
        return "Qualificação";
    }

    if (texto.includes("sprint")) {
        return "Sprint";
    }

    if (texto.includes("race") || texto.includes("corrida")) {
        return "Corrida principal";
    }

    return "Sessão";
}


function obterTipoSessao(dados) {

    return (
        dados?.SessionType ||
        dados?.Type ||
        dados?.Session?.Type ||
        dados?.Session?.SessionType ||
        ""
    );
}


function obterNomeOficialSessao(dados) {

    return (
        dados?.OfficialName ||
        dados?.Name ||
        dados?.SessionName ||
        dados?.Session?.Name ||
        dados?.Session?.OfficialName ||
        ""
    );
}


function identificarQualificacao(standings) {

    if (!standings?.Lines) {
        return "";
    }

    const textos = Object.values(standings.Lines)
        .map(piloto => textoNormalizado(piloto?.Status))
        .join(" ");

    if (textos.includes("q3")) return "Q3";
    if (textos.includes("q2")) return "Q2";
    if (textos.includes("q1")) return "Q1";

    return "";
}


function nomeSessaoAmigavel(dados, standings) {

    const tipo = textoNormalizado(obterTipoSessao(dados));
    const nome = textoNormalizado(obterNomeOficialSessao(dados));

    if (
        tipo.includes("qualifying") ||
        tipo.includes("qualification") ||
        nome.includes("qualifying") ||
        nome.includes("qualification") ||
        nome.includes("qualificacao")
    ) {
        const segmento = identificarQualificacao(standings);
        if (segmento) {
            return "Qualificação " + segmento;
        }
        return "Qualificação";
    }

    if (
        tipo.includes("practice") ||
        nome.includes("practice") ||
        nome.includes("treino")
    ) {
        if (nome.includes("3") || nome.includes("fp3")) return "Treino Livre 3";
        if (nome.includes("2") || nome.includes("fp2")) return "Treino Livre 2";
        if (nome.includes("1") || nome.includes("fp1")) return "Treino Livre 1";
        return "Treino Livre";
    }

    if (tipo.includes("sprint") || nome.includes("sprint")) {
        return "Sprint";
    }

    if (tipo.includes("race") || nome.includes("race") || nome.includes("corrida")) {
        return "Corrida principal";
    }

    return "Sessão atual";
}


function formatarAtualizacao() {

    return new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}


async function atualizarStints() {

    try {

        const resposta =
            await fetch(
                "http://localhost:3000/api/tyres"
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro HTTP " +
                resposta.status
            );

        }


        dadosStints =
            await resposta.json();


        montarStints();

        atualizarTabelaComPneus();

    }


    catch (erro) {

        console.error(
            "Erro ao buscar pneus:",
            erro
        );


        document
            .getElementById("stintsGrid")
            .innerHTML = `

                    <div class="stints-vazio">

                        Não foi possível carregar
                        os dados dos pneus.

                    </div>

                `;

    }

}


function montarStints() {

    const grid =
        document.getElementById(
            "stintsGrid"
        );


    grid.innerHTML = "";


    if (
        !dadosStints ||
        !dadosStints.Leaderboard ||
        !dadosStints.Lines
    ) {

        grid.innerHTML = `

                <div class="stints-vazio">

                    Nenhum dado de pneus disponível.

                </div>

            `;

        return;

    }


    dadosStints.Leaderboard.forEach(
        numero => {

            const piloto =
                dadosStints.Lines[numero];


            if (
                !piloto ||
                !piloto.BroadcastName
            ) {
                return;
            }


            const card =
                document.createElement("div");


            card.className =
                "stint-card";


            if (
                piloto.Retired ||
                piloto.Stopped
            ) {

                card.classList.add("dnf");

            }


            let stintsHTML = "";


            if (
                Array.isArray(piloto.Stints) &&
                piloto.Stints.length > 0
            ) {

                piloto.Stints.forEach(
                    (stint, index) => {

                        const compound =
                            stint.Compound ||
                            "DESCONHECIDO";


                        const voltas =
                            stint.TotalLaps ??
                            "—";


                        stintsHTML += `

                                <div class="stint">

                                    <span class="pneu ${classePneu(
                            compound
                        )
                            }">

                                        ${nomePneu(
                                compound
                            )}

                                    </span>

                                    <span class="stint-voltas">

                                        ${voltas}
                                        ${voltas === 1
                                ? "volta"
                                : "voltas"
                            }

                                    </span>

                                    <span class="stint-novo">

                                        STINT ${index + 1}

                                    </span>

                                </div>

                            `;

                    }
                );

            }

            else {

                stintsHTML = `

                        <div class="stints-vazio">

                            Nenhum stint disponível

                        </div>

                    `;

            }


            card.innerHTML = `

                    <div class="stint-topo">

                        <div class="stint-piloto">

                            <strong>
                                ${piloto.BroadcastName}
                            </strong>

                            <span class="stint-equipe">

                                ${piloto.TeamName ||
                "Equipe desconhecida"
                }

                            </span>

                        </div>

                    </div>

                    <div class="stints-linha">

                        ${stintsHTML}

                    </div>

                `;


            grid.appendChild(card);

        }
    );

}


async function atualizar() {

    try {

        const resposta =
            await fetch(
                "http://localhost:3000/api/standings"
            );


        const dados =
            await resposta.json();

        window.ultimosStandings = dados;
        try {
            const respostaSessao = await fetch(
                "http://localhost:3000/api/session",
                { cache: "no-store" }
            );
            const dadosSessao = await respostaSessao.json();
            window.tipoSessaoAtual = obterTipoSessao(dadosSessao);
        } catch (erroSessao) {
            window.tipoSessaoAtual = "";
        }


        const tabela =
            document.getElementById(
                "tabela"
            );


        tabela.innerHTML = "";


        const melhorVolta =
            encontrarMelhorVolta(
                dados
            );


        dados.Leaderboard.forEach(
            numero => {

                const piloto =
                    dados.Lines[numero];


                if (
                    !piloto ||
                    !piloto.FullName
                ) {
                    return;
                }


                const status = obterStatusPiloto(piloto);
                const dnf = status === "DNF" || status === "DNS";


                const ehMelhorVolta =
                    melhorVolta &&
                    melhorVolta.numero ===
                    numero;


                const linha =
                    document.createElement("tr");


                if (dnf) {

                    linha.classList.add(
                        "piloto-dnf"
                    );

                }


                if (ehMelhorVolta) {

                    linha.classList.add(
                        "volta-mais-rapida"
                    );

                }
                let pneuHTML = `

                        <span class="pneu pneu-desconhecido">

                            —

                        </span>

                    `;


                if (
                    dadosStints &&
                    dadosStints.Lines
                ) {

                    const linhaStint =
                        dadosStints.Lines[numero];


                    const stintAtual =
                        obterPneuAtual(
                            linhaStint
                        );


                    if (stintAtual) {

                        pneuHTML = `

                                <span class="pneu ${classePneu(
                            stintAtual.Compound
                        )
                            }">

                                    ${nomePneu(
                                stintAtual.Compound
                            )
                            }

                                </span>

                            `;

                    }

                }


                let melhorVoltaHTML = "—";


                if (
                    piloto.BestLapTime &&
                    piloto.BestLapTime.Value
                ) {

                    melhorVoltaHTML = `

                            <span class="${ehMelhorVolta
                            ? "melhor-volta"
                            : ""
                        }">

                                ${piloto.BestLapTime.Value
                        }

                            </span>

                        `;

                }


                linha.innerHTML = `

                        <td>
                            ${piloto.Position || "—"}
                        </td>

                        <td>
                            ${piloto.FullName}
                        </td>

                        <td>
                            ${piloto.TeamName || "—"}
                        </td>

                        <td>
                            ${pneuHTML}
                        </td>

                        <td>
                            ${obterGapPiloto(piloto, dados)}
                        </td>

                        <td>
                            ${melhorVoltaHTML}
                        </td>

                        <td>

                            <span class="${classeStatusPiloto(status)}">

                                ${status}

                            </span>

                        </td>

                    `;


                tabela.appendChild(linha);

            }
        );


        await atualizarStatusSessao();


        if (!dadosStints) {

            await atualizarStints();

        }

    }


    catch (erro) {

        console.error(erro);


        const status =
            document.getElementById(
                "status"
            );


        status.textContent =
            "Não foi possível conectar ao Live Timing";


        status.className =
            "status-sessao status-sem-sessao";

    }

}


function atualizarTabelaComPneus() {

    if (!dadosStints) {
        return;
    }


    const linhas =
        document.querySelectorAll(
            "#tabela tr"
        );


    linhas.forEach(linha => {

        const celulas =
            linha.querySelectorAll("td");


        if (celulas.length < 7) {
            return;
        }


        const nome =
            celulas[1].textContent
                .trim()
                .toUpperCase();


        let encontrado = null;


        Object.values(
            dadosStints.Lines || {}
        ).forEach(piloto => {

            if (
                piloto &&
                piloto.BroadcastName &&
                piloto.BroadcastName
                    .toUpperCase()
                    .includes(
                        nome.split(" ").pop()
                    )
            ) {

                encontrado = piloto;

            }

        });


        if (!encontrado) {
            return;
        }


        const stintAtual =
            obterPneuAtual(
                encontrado
            );


        if (!stintAtual) {
            return;
        }


        celulas[3].innerHTML = `

                <span class="pneu ${classePneu(
            stintAtual.Compound
        )
            }">

                    ${nomePneu(
                stintAtual.Compound
            )
            }

                </span>

            `;

    });

}


function proximaSessaoAmigavel(dados) {

    const tipo = textoNormalizado(obterTipoSessao(dados));
    const nome = textoNormalizado(obterNomeOficialSessao(dados));
    const atual = nomeSessaoAmigavel(dados, window.ultimosStandings || null);

    if (tipo.includes("practice") || nome.includes("practice") || nome.includes("treino")) {
        if (nome.includes("1") || nome.includes("fp1")) return "Treino Livre 2";
        if (nome.includes("2") || nome.includes("fp2")) return "Treino Livre 3";
        if (nome.includes("3") || nome.includes("fp3")) return "Qualificação";
    }

    if (tipo.includes("sprint qualifying") || nome.includes("sprint qualifying") || nome.includes("sprint shootout")) {
        return "Sprint";
    }

    if (tipo.includes("sprint") || nome.includes("sprint")) {
        return "Qualificação";
    }

    if (tipo.includes("qualifying") || tipo.includes("qualification") || nome.includes("qualifying") || nome.includes("qualification") || nome.includes("qualificacao")) {
        return "Corrida principal";
    }

    if (tipo.includes("race") || nome.includes("race") || nome.includes("corrida")) {
        return "Treino Livre 1 do próximo GP";
    }

    if (atual === "Sessão atual") {
        return "Aguardando próxima sessão";
    }

    return "Próxima sessão";
}

function atualizarProximaSessao(dados) {

    const proxima = proximaSessaoAmigavel(dados);
    const nome = document.getElementById("proximaSessaoLive");
    const status = document.getElementById("proximaSessaoStatusLive");

    if (!nome || !status) return;

    nome.textContent = proxima;

    if (proxima.includes("próximo GP")) {
        status.textContent = "Próximo fim de semana de Fórmula 1";
    } else {
        status.textContent = "Na sequência desta sessão";
    }
}

async function atualizarStatusSessao() {

    const elemento = document.getElementById("status");
    const sessaoInfo = document.getElementById("sessaoInfo");
    const atualizacao = document.getElementById("ultimaAtualizacao");

    try {

        const resposta = await fetch("http://localhost:3000/api/session", { cache: "no-store" });

        if (!resposta.ok) {
            throw new Error("HTTP " + resposta.status);
        }

        const sessao = await resposta.json();
        const dadosTabela = window.ultimosStandings || null;
        const statusSessao = traduzirStatusSessao(sessao?.Status, sessao);
        const nomeSessao = nomeSessaoAmigavel(sessao, dadosTabela);
        const tipoSessao = traduzirTipoSessao(obterTipoSessao(sessao));

        elemento.textContent = statusSessao;
        elemento.className = "status-sessao " + (
            statusSessao === "AO VIVO"
                ? "status-live"
                : statusSessao === "Finalizado"
                    ? "status-finalizada"
                    : "status-sem-sessao"
        );

        if (sessaoInfo) {
            sessaoInfo.innerHTML = `
                        <div class="sessao-titulo">${nomeSessao}</div>
                        <div class="sessao-detalhes">${tipoSessao} · ${statusSessao}</div>
                    `;
        }

        const sessaoAtualLive = document.getElementById("sessaoAtualLive");
        const sessaoAtualStatusLive = document.getElementById("sessaoAtualStatusLive");

        if (sessaoAtualLive) sessaoAtualLive.textContent = nomeSessao;
        if (sessaoAtualStatusLive) sessaoAtualStatusLive.textContent = tipoSessao + " · " + statusSessao;

        atualizarProximaSessao(sessao);

        if (atualizacao) {
            atualizacao.textContent = "Atualizado às " + formatarAtualizacao();
        }

    } catch (erro) {

        console.error(erro);
        elemento.textContent = "SEM CONEXÃO";
        elemento.className = "status-sessao status-sem-sessao";

        if (sessaoInfo) {
            sessaoInfo.innerHTML = `
                        <div class="sessao-titulo">Live Timing indisponível</div>
                        <div class="sessao-detalhes">Verifique se o servidor local está aberto</div>
                    `;
        }

        const sessaoAtualLive = document.getElementById("sessaoAtualLive");
        const sessaoAtualStatusLive = document.getElementById("sessaoAtualStatusLive");
        const proximaSessaoLive = document.getElementById("proximaSessaoLive");
        const proximaSessaoStatusLive = document.getElementById("proximaSessaoStatusLive");

        if (sessaoAtualLive) sessaoAtualLive.textContent = "Indisponível";
        if (sessaoAtualStatusLive) sessaoAtualStatusLive.textContent = "Verifique o servidor local";
        if (proximaSessaoLive) proximaSessaoLive.textContent = "Indisponível";
        if (proximaSessaoStatusLive) proximaSessaoStatusLive.textContent = "Verifique o servidor local";

        if (atualizacao) {
            atualizacao.textContent = "Última tentativa às " + formatarAtualizacao();
        }
    }
}


renderizarCalendario();
atualizarStatusSessao();

setInterval(() => {

    renderizarCalendario();

    const liveAberto =
        document
            .getElementById("paginaLive")
            .classList
            .contains("ativa");


    if (liveAberto) {

        atualizar();

    }

}, 2000);
