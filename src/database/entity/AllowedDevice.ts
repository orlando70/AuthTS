import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import { GenericEntity } from '../generic';
import User from './User'

@Entity()
export default class AllowedDevices extends GenericEntity {
    @ManyToOne(() => User, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn()
    user!: User;

    @Column()
    userAgent!: string;

    @Column()
    ip!: string;
}