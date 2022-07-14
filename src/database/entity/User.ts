import { Entity, Column } from 'typeorm'
import { GenericEntity } from '../generic'

@Entity()
export default class User extends GenericEntity {
  // You can add other sensitive information inside the array
  static sensitiveFields = ['password'] as (keyof User)[]
    @Column()
      firstName!: string

    @Column()
      lastName!: string

    @Column()
      email!: string

    @Column()
      password!: string

    @Column({ type: 'boolean', default: false })
      isEmailVerified!: boolean
}
