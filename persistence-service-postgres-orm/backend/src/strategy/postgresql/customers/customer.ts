import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

}
