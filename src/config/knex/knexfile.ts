import * as dotenv from 'dotenv';
import type { Knex } from 'knex';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const sslConfig = isProduction ? { rejectUnauthorized: false } : false;

const config: Record<string, Knex.Config>  = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.POSTGRES_DB || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      database: process.env.POSTGRES_DB || 'mydatabase',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      ssl: false,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/postgres/migrations',
    },
    seeds: {
      directory: './src/postgres/seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './dist/postgres/migrations',
    },
    seeds: {
      directory: './dist/postgres/seeds',
    },
  },

  // Конфигурация для Docker
  docker: {
    client: 'postgresql',
    connection: {
      host: process.env.POSTGRES_DB || 'postgres',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      database: process.env.POSTGRES_DB || 'mydatabase',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      ssl: false,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './dist/postgres/migrations',
    },
    seeds: {
      directory: './dist/postgres/seeds',
    },
  }
};

// Для Docker используем docker конфиг или production
const environment = process.env.NODE_ENV || 'development';
export default config[environment] || config.docker;