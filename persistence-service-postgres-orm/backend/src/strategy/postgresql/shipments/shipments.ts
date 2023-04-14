import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shipments {
  @PrimaryGeneratedColumn()
  shipmentId: number;

  @Column()
  customerId : number;

  @Column({
    length: 20,
  })
  orgin : string;

  @Column({
    length: 20,
  })
  destination : string;

  @Column()
  weights : number;

  @Column()
  values : number;

}
