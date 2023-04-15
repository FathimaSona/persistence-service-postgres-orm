import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Customer } from "../customers";

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

  @ManyToOne(() => Customer, (customer: Customer) => customer.shipments)
  customer: Customer;

}
