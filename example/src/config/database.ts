import knex from 'knex';
import knexFile from '../knexfile';

const db = knex(knexFile.development);

export default db;
