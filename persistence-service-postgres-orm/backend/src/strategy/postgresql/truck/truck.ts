import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Truck {
  @PrimaryGeneratedColumn()
  truckNumber: number;

  @Column({
    length: 20,
  })
  Brand : string;

  @Column()
  Load : number;

  @Column()
  Capacity : number;

  @Column()
  Year : number;

  @Column()
  Repairs : number;

}
