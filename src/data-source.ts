import { DataSource } from "typeorm"
import config, { AppEnvironmentEnum } from './config'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.database,
    synchronize: config.app.env === AppEnvironmentEnum.TEST,
    dropSchema: config.app.env === AppEnvironmentEnum.TEST,
    migrationsRun: config.app.env !== AppEnvironmentEnum.TEST,
    logging: false,
    entities: [`${__dirname}/src/database/entity/*.ts`, `${__dirname}/src/database/entity/*.js`],
    migrations: [`${__dirname}/src/database/migrations/*.ts`, `${__dirname}/src/database/migrations/*.js`],
    subscribers: [],
    timezone: 'Z'
})
