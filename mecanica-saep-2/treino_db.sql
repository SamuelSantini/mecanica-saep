-- Oficina Mecânica
-- 1. Crie o banco:  CREATE DATABASE treino_db;
-- 2. Abra esse banco e execute este arquivo.
-- Pode executar de novo: o DROP apaga as tabelas antes de criar.

DROP TABLE IF EXISTS agendamento, veiculo, cliente, usuario CASCADE;

-- Quem entra no sistema. PRIMARY KEY identifica a linha. UNIQUE não deixa o login repetir.
CREATE TABLE usuario (
  id    SERIAL PRIMARY KEY,
  nome  VARCHAR(100) NOT NULL,
  login VARCHAR(50)  NOT NULL UNIQUE,
  senha TEXT         NOT NULL
);

CREATE TABLE cliente (
  id       SERIAL PRIMARY KEY,
  nome     VARCHAR(100) NOT NULL,
  cpf      VARCHAR(14)  NOT NULL,
  telefone VARCHAR(20)  NOT NULL
);

-- id_cliente é chave estrangeira: só aceita um id que exista em cliente.
-- ON DELETE CASCADE apaga os veículos do cliente. Os agendamentos desses veículos também saem.
CREATE TABLE veiculo (
  id         SERIAL PRIMARY KEY,
  placa      VARCHAR(10) NOT NULL,
  modelo     VARCHAR(60) NOT NULL,
  ano        INT         NOT NULL,
  id_cliente INT         NOT NULL REFERENCES cliente(id) ON DELETE CASCADE
);

-- Só o dia, sem horário. id_veiculo aponta para veiculo.
CREATE TABLE agendamento (
  id                SERIAL PRIMARY KEY,
  data_agendamento  DATE         NOT NULL,
  servico           VARCHAR(100) NOT NULL,
  id_veiculo        INT          NOT NULL REFERENCES veiculo(id) ON DELETE CASCADE
);

-- Login da aula: admin / 123456
INSERT INTO usuario (nome, login, senha) VALUES
('Administrador', 'admin', '123456');

INSERT INTO cliente (nome, cpf, telefone) VALUES
('João Silva',   '111.111.111-11', '(48) 99999-1111'),
('Maria Santos', '222.222.222-22', '(48) 99999-2222'),
('Pedro Costa',  '333.333.333-33', '(48) 99999-3333');

INSERT INTO veiculo (placa, modelo, ano, id_cliente) VALUES
('ABC-1234', 'Gol',   2015, 1),
('DEF-5678', 'Onix',  2020, 2),
('GHI-9012', 'Palio', 2012, 3);

INSERT INTO agendamento (data_agendamento, servico, id_veiculo) VALUES
('2026-10-20', 'Troca de óleo',    1),
('2026-10-18', 'Revisão completa', 2),
('2026-10-25', 'Troca de freios',  3);
