import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class GenericEntity {
    @PrimaryGeneratedColumn('uuid')
      id: string

    @CreateDateColumn()
      createdAt: Date

    @UpdateDateColumn()
      updatedAt: Date
}
