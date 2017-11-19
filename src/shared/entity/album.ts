import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    public Id: number;

    @Column()
    public Name: string;
}
