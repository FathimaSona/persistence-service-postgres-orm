import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Shipments } from "../shipments";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customerId: number;

  @Column({
    length: 20,
  })
  customerName : string;

  @Column({
    length: 50,
  }
  )
  address : string;

  @Column()
  phoneNo1 : number;

  @Column()
  phoneNo2 : number;

  // @OneToMany(() => Shipments, (shipments: Shipment) => shipments.customer)
  // shipments: Shipment[];

}
