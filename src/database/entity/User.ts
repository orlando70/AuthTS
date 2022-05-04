import { Entity, Column } from "typeorm"
import { GenericEntity } from "../generic"

@Entity()
export default class User extends GenericEntity{
    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    username!: string;
}
