import { DataSource } from 'typeorm';
import dbDataSource from '@app/config/db';

let dbClient: Promise<DataSource>;
const getDbClient = () => {
  if(!dbClient){
    dbClient = dbDataSource.initialize().then((ds: DataSource) => ds);
  }
  return dbClient;
}

export default getDbClient
