import { DataSource } from "typeorm"
import config, { AppEnvironmentEnum } from '.'

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
    entities: ["src/database/entity/*{.js,.ts}"],
    migrations: ["src/database/migrations/*{.js,.ts}"],
    subscribers: [],
    timezone: 'Z'
})
