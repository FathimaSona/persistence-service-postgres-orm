import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  empNumber: number;

  @Column({
    length: 20,
  })
  FirstName : string;

  @Column({
    length: 20,
  })
  SurName : string;

  @Column()
  Seniority : number;

}
