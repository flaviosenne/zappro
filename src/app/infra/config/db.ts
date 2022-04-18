import { join } from 'path';
import { DataSource } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

import { ServerError } from '../../domain/exceptions/server-error';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USERNAME } from './variables-global';

const developmentConfig: MysqlConnectionOptions = {
    type: "mysql",
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASS,
    database: DB_DATABASE,
    logging: false,
    driver: "mysql2",
    entities: [join(__dirname, '..', 'entities', '*.{js,ts}')],
}

const testConfig: SqliteConnectionOptions = {
    type: "sqlite",
    database: join(__dirname, '..', '..', '..', 'db', 'db.sqlite'),
    logging: false,
    entities: [join(__dirname, '..', 'entities', '*.{js,ts}')]
}




const getDbInstance = async (): Promise<DataSource> => {

    const connection = new DataSource(testConfig)

    try {
        console.info('DB SQL connected ')

        await connection.initialize()
        // await connection.synchronize()

        return connection
    }
    catch (err) {
        console.error(err)
        throw new ServerError('Error connect DB')
    }
}


export const DBInstance = getDbInstance()