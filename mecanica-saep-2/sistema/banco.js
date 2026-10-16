// Conexão com o PostgreSQL.
// Se o seu usuário ou senha forem diferentes, altere aqui.
import { Pool } from 'pg';

const banco = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'treino_db',
});

export default banco;
