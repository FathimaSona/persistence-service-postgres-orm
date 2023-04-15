import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Truck } from "../truck";

@Entity()
export class Mechanic{
  @PrimaryGeneratedColumn()
  mechanicId: number;

  @Column({
    length: 100,
  })
  brandSpecialist: string;

  @OneToMany(() => Truck, (truck:   Truck) => truck.mechanic);
  trucks: Truck[];

}
