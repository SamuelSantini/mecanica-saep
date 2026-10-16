import express from 'express';
import banco from './banco.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/login', async (req, res) => {
  const { login, senha } = req.body;
  const resultado = await banco.query(
    'SELECT nome FROM usuario WHERE login = $1 AND senha = $2',
    [login, senha]
  );

  if (resultado.rows.length === 0) {
    return res.status(401).json({ erro: 'Login ou senha inválidos' });
  }

  res.json({ nome: resultado.rows[0].nome });
});

app.get('/api/clientes', async (req, res) => {
  const resultado = await banco.query(
    'SELECT id, nome, cpf, telefone FROM cliente ORDER BY nome'
  );
  res.json(resultado.rows);
});

app.post('/api/clientes', async (req, res) => {
  const { nome, cpf, telefone } = req.body;
  await banco.query(
    'INSERT INTO cliente (nome, cpf, telefone) VALUES ($1, $2, $3)',
    [nome, cpf, telefone]
  );
  res.json({ ok: true });
});

app.put('/api/clientes/:idDoRegistro', async (req, res) => {
  let id = req.params.idDoRegistro;
  const { nome, cpf, telefone } = req.body;
  await banco.query(
    'UPDATE cliente SET nome = $1, cpf = $2, telefone = $3 WHERE id = $4',
    [nome, cpf, telefone, id]
  );
  res.json({ ok: true });
});

app.delete('/api/clientes/:idDoRegistro', async (req, res) => {
  let id = req.params.idDoRegistro;
  await banco.query('DELETE FROM cliente WHERE id = $1', [id]);
  res.json({ ok: true });
});

app.get('/api/veiculos', async (req, res) => {
  const resultado = await banco.query(
    `SELECT veiculo.id, veiculo.placa, veiculo.modelo, veiculo.ano, veiculo.id_cliente,
            cliente.nome AS cliente
       FROM veiculo
       JOIN cliente ON cliente.id = veiculo.id_cliente
      ORDER BY veiculo.id`
  );
  res.json(resultado.rows);
});

app.post('/api/veiculos', async (req, res) => {
  const { placa, modelo, ano, id_cliente } = req.body;
  await banco.query(
    'INSERT INTO veiculo (placa, modelo, ano, id_cliente) VALUES ($1, $2, $3, $4)',
    [placa, modelo, ano, id_cliente]
  );
  res.json({ ok: true });
});

app.put('/api/veiculos/:idDoRegistro', async (req, res) => {
  let id = req.params.idDoRegistro;
  const { placa, modelo, ano, id_cliente } = req.body;
  await banco.query(
    'UPDATE veiculo SET placa = $1, modelo = $2, ano = $3, id_cliente = $4 WHERE id = $5',
    [placa, modelo, ano, id_cliente, id]
  );
  res.json({ ok: true });
});

app.delete('/api/veiculos/:idDoRegistro', async (req, res) => {
  let id = req.params.idDoRegistro;
  await banco.query('DELETE FROM veiculo WHERE id = $1', [id]);
  res.json({ ok: true });
});

app.get('/api/agendamentos', async (req, res) => {
  const resultado = await banco.query(
    `SELECT agendamento.id,
            to_char(agendamento.data_agendamento, 'YYYY-MM-DD') AS data_agendamento,
            agendamento.servico,
            agendamento.id_veiculo,
            cliente.nome AS cliente,
            veiculo.placa,
            veiculo.modelo
       FROM agendamento
       JOIN veiculo ON veiculo.id = agendamento.id_veiculo
       JOIN cliente ON cliente.id = veiculo.id_cliente
      ORDER BY agendamento.data_agendamento`
  );
  res.json(resultado.rows);
});

app.post('/api/agendamentos', async (req, res) => {
  const { data_agendamento, servico, id_veiculo } = req.body;
  await banco.query(
    'INSERT INTO agendamento (data_agendamento, servico, id_veiculo) VALUES ($1, $2, $3)',
    [data_agendamento, servico, id_veiculo]
  );
  res.json({ ok: true });
});

app.put('/api/agendamentos/:idDoRegistro', async (req, res) => {
  const { data_agendamento, servico, id_veiculo } = req.body;
  await banco.query(
    'UPDATE agendamento SET data_agendamento = $1, servico = $2, id_veiculo = $3 WHERE id = $4',
    [data_agendamento, servico, id_veiculo, req.params.idDoRegistro]
  );
  res.json({ ok: true });
});

app.delete('/api/agendamentos/:idDoRegistro', async (req, res) => {
  await banco.query('DELETE FROM agendamento WHERE id = $1', [req.params.idDoRegistro]);
  res.json({ ok: true });
});



app.listen(3000, () => {
  console.log('Abra http://localhost:3000');
  console.log('Login: admin    Senha: 123456');
});
