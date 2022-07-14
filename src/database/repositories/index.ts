import { EntityTarget, Repository } from 'typeorm'
import { AppDataSource } from '../../config/data-source'

export const getRepositoryWithQueryRunner = async <T> (entity: EntityTarget<T>): Promise<Repository<T>> => {
  const qr = AppDataSource.createQueryRunner()
  await qr.connect()
  return qr.manager.getRepository(entity)
}
