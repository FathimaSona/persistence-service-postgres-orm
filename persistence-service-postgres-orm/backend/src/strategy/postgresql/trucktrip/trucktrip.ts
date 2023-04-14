import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Trucktrip {
  @PrimaryGeneratedColumn()
  tripId: number;

  @Column({
    length: 20,
  })
  tripOrgin : string;

  @Column({
    length: 20,
  })
  tripDestination : string;

  @Column()
  truckNumber : number;

  @Column()
  noOfDrivers : number;

  @Column()
  driverId : number;

  @Column()
  shipmentId : number;

}
