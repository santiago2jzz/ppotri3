# F1 Race Companion

## Como iniciar

1. Abra o terminal dentro desta pasta.
2. Execute `node server.js`.
3. Abra `http://localhost:3001` no navegador.
4. Crie sua conta na tela inicial ou entre com usuário e senha.

O servidor do site usa a porta **3001**. O servidor separado do Live Timing deve continuar ativo na porta **3000**, pois `main.js` consulta os endpoints dele.

## Bancos de dados

- `database.sqlite`: banco original do projeto, com os dados de Fórmula 1. Ele foi preservado.
- `usuarios.sqlite`: criado automaticamente na primeira execução; contém somente a tabela `usuarios`, com nome de usuário e hash da senha.

As senhas não são armazenadas em texto puro. O hash é gerado com `scrypt` e um salt aleatório.

## Segurança local

O arquivo `session.secret` é criado automaticamente e assina o cookie de autenticação. Não o compartilhe nem o envie ao GitHub. O arquivo `usuarios.sqlite` também deve permanecer privado.

O login foi implementado sem adicionar dependências novas: usa Express, better-sqlite3 e módulos nativos do Node.js.
