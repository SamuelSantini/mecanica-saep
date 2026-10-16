# Mecânica SAEP

Sistema web de uma oficina mecânica. Cadastra clientes, veículos e agendamentos. O servidor é Node.js com Express; o banco é PostgreSQL.

## Como rodar

1. Crie o banco `treino_db` no PostgreSQL e execute `mecanica-saep-2/treino_db.sql`.
2. Confira usuário e senha do banco em `mecanica-saep-2/sistema/banco.js`.
3. Na pasta `mecanica-saep-2/sistema`, rode `npm install` e depois `npm start`.
4. Abra http://localhost:3000.
5. Login da aula: `admin` / `123456`.

## O que tem em cada arquivo

Tudo do sistema fica em `mecanica-saep-2/`.

| Caminho | O que é |
| --- | --- |
| `treino_db.sql` | Cria as tabelas `usuario`, `cliente`, `veiculo` e `agendamento` e insere dados de exemplo. |
| `diagrama_er.png` | Diagrama entidade-relacionamento do banco. |
| `documentacao.pdf` | Documentação do trabalho. |
| `sistema/package.json` | Dependências (`express` e `pg`) e o script `npm start`. |
| `sistema/package-lock.json` | Versões exatas das dependências instaladas. |
| `sistema/banco.js` | Conexão com o PostgreSQL (`localhost`, banco `treino_db`). |
| `sistema/servidor.js` | API na porta 3000: login e cadastro de clientes, veículos e agendamentos. |
| `sistema/public/login.html` | Tela de login. |
| `sistema/public/index.html` | Página inicial depois do login. |
| `sistema/public/clientes.html` | Tela de clientes. |
| `sistema/public/veiculos.html` | Tela de veículos (cada veículo pertence a um cliente). |
| `sistema/public/agendamentos.html` | Tela de agendamentos (cada agendamento pertence a um veículo). |
| `sistema/public/css/estilo.css` | Estilo das páginas. |
| `sistema/public/js/funcoes.js` | Função que chama a API e a mensagem de boas-vindas. |
| `sistema/public/js/login.js` | Envia login e senha e abre a página inicial. |
| `sistema/public/js/clientes.js` | Lista, cria, edita e apaga clientes. |
| `sistema/public/js/veiculos.js` | Lista, cria, edita e apaga veículos. |
| `sistema/public/js/agendamentos.js` | Lista, cria, edita e apaga agendamentos. |

A pasta `sistema/node_modules/` é gerada pelo `npm install` e não entra no Git.
