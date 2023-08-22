import 'reflect-metadata';
import { Company } from '@app/entities/Company';
import { Unit } from '@app/entities/Unit';
import { CompanyUnit } from '@app/entities/CompanyUnit';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { DataSource } from 'typeorm';

// process.env.MYSQL_HOST
const dbDataSourceOptions = new DataSource({
  type: "mariadb",
  host: 'localhost',
  port: 3306,
  username: 'phazerous',
  password: 'phazerous',
  database: 'phazerous',
  synchronize: true,
  entities: [
    Company,
    Unit,
    CompanyUnit
    //"src/entities/*.{ts,js}"
  ],
  logging: true
} as MysqlConnectionOptions)

export default dbDataSourceOptions;
