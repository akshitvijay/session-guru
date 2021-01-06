import path from 'path';
import { Connection, createConnection } from 'typeorm';
import { DATABASE_URL } from '../_config/constants';

let connection: Connection;

const entitiesPath = path.join(process.cwd(), 'dist/_entities/*.js');

export const synchronizeDBSchema = async () => {
  await getConnection();
  connection.synchronize();
};

export const getConnection = async (): Promise<Connection> => {
  const db_url = DATABASE_URL;
  if (!connection) {
    connection = await createConnection({
      type: 'postgres',
      url: db_url,
      entities: [entitiesPath],
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  return connection;
};
