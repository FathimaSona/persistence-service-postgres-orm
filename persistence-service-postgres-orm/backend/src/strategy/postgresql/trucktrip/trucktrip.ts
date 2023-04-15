import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Truck } from "../truck";

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

  @ManyToOne(() => Truck, (truck: Truck) => truck.truckTrips)
  truck: Truck[];

}
