import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Breakdowntrucks } from "../breakdowntrucks";
import { Mechanic } from "../mechanic";
import { Trucktrip } from "../trucktrip";

@Entity()
export class Truck {
  @PrimaryGeneratedColumn()
  truckNumber: number;

  @Column({
    length: 20,
    required: true
  })
  brand : string;

  @Column()
  load : number;

  @Column()
  capacity : number;

  @Column()
  year : number;

  @Column()
  numRepairs : number;

  @OneToMany(() => Breakdowntrucks, (breakdowntrucks:   Breakdowntrucks) => breakdowntrucks.truck)
  breakdownTrucks: Breakdowntrucks[];

  @ManyToOne(() => Mechanic, (mechanic: Mechanic) => mechanic.trucks)
  mechanic: Mechanic;

  @OneToMany(() => Trucktrip, (truckTrip: Trucktrip) => truckTrip.truck)
  truckTrips: Trucktrip[];

}
