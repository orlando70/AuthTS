import {AppDataSource} from '../data-source'
import 'reflect-metadata'

export default async () => {
await AppDataSource.initialize();
console.log('Database connected...');
}