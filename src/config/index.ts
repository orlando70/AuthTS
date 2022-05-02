import env from 'dotenv';

env.config()

export enum AppEnvironmentEnum {
    TEST = 'test',
    LOCAL = 'local',
    DEVELOPMENT = 'development',
    STAGING = 'staging',
    PRODUCTION = 'production',
}

type Config = {
    env: {
        isProduction: boolean,
        isTest: boolean,
        isDevelopment: boolean,
    },
    app: {
        port: number,
        env: AppEnvironmentEnum,
        secret: string,
        domain: string,
        logo: string,
        name: string,
    },
    db: {
        host: string,
        port: number,
        database: string,
        user: string,
        password: string,
    },
    redis: {
        mode: string,
        host: string,
        port: number,
        password: string,
    },
    sendgrid: {
        api_key: string,
    },
    twilio: {
        service_id: string,
        auth_token: string,
        account_sid: string,
    }
}

const isTestEnviroment = process.env.APP_ENV === AppEnvironmentEnum.TEST;

const config: Config = {
    env: {
        isProduction: process.env.NODE_ENV === AppEnvironmentEnum.PRODUCTION,
        isTest: process.env.NODE_ENV === AppEnvironmentEnum.TEST,
        isDevelopment: process.env.NODE_ENV === AppEnvironmentEnum.DEVELOPMENT,
    },
    app: {
        port: +process.env.PORT! || 5000,
        env: process.env.APP_ENV as AppEnvironmentEnum,
        secret: process.env.APP_SECRET!,
        domain: process.env.APP_DOMAIN!,
        logo: process.env.APP_LOGO!,
        name: process.env.APP_NAME!,
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT! || 3306,
        database: isTestEnviroment ? process.env.TEST_DB_DATABASE! : process.env.DB_DATABASE!,
        user: isTestEnviroment ? process.env.TEST_DB_USER! : process.env.DB_USER!,
        password: isTestEnviroment ? process.env.TEST_DB_PASSWORD! : process.env.DB_PASSWORD!,
    },
    redis: {
        mode: process.env.REDIS_MODE || 'cluster',
        host: process.env.REDIS_HOST!,
        port: +process.env.REDIS_PORT!,
        password: process.env.REDIS_PASSWORD!,
    },
    sendgrid: {
        api_key: process.env.SENDGRID_API_KEY!,
    },
    twilio: {
        service_id: process.env.TWILIO_SERVICE_ID!,
        auth_token: process.env.TWILIO_AUTH_TOKEN!,
        account_sid: process.env.TWILIO_ACCOUNT_SID!,
    }
}

const validateConfiguration = () => {
    const missingKeys: string[] = [];
    Object.entries(config).forEach(([baseKey, baseValue]) => {
        Object.entries(baseValue).forEach(([key, value]) => {
            if (value === '' || value === undefined) {
                missingKeys.push(`${baseKey}.${key}`)
            }
        })
    });
    if (missingKeys.length) {
        global.console.error(`The following configuration keys ${missingKeys.join(', ')} are not set`)
        process.exit(1);
    };
}

validateConfiguration();

export default config;