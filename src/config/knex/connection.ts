import knex from 'knex';
import config from './knexfile';

const knexConfig = config;

const db = knex(knexConfig);

export default db;
