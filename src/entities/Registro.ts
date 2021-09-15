import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Registro {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userIP: string;

    @Column()
    date: Date;

    @Column()
    artistName: string;

}