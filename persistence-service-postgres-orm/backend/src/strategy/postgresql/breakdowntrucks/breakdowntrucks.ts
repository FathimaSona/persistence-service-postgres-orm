import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Breakdowntrucks {
  @PrimaryGeneratedColumn()
  breakdowntruckId: number;

  @Column()
  truckNumber : number;

  @Column()
  mechanicId : number;

  @Column()
  estimatedTime : number;

}
