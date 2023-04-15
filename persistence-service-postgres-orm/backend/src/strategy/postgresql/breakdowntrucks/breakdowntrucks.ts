import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Truck } from "../truck";

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

  @ManyToOne(() => Truck, (truck: Truck) => truck.breakdownTrucks)
  truck: Truck;

}
