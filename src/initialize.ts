import 'express-async-errors'
import connectDB from './database/setup'

const connectRedis = async () => {
    const redis = (await import('./database/redis')).default;

    return new Promise((resolve, reject) => {
        redis.on('connect', () => {
            console.log('redis connected successfully');
            resolve(true)
        });
        redis.on('error', (err: any) => {
            console.log('redis connection not successful', err);
            reject(err);
        })
    })
}

export default async () => {
    await connectRedis();
    await connectDB()
    
    const app = (await import('./app')).default;
    const router = (await import('./router')).default;
    app.use(router);
}