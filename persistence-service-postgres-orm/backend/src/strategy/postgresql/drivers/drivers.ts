import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToOne,JoinColumn } from "typeorm";
import { Employees } from "../employees";

@Entity()
export class Drivers {
  @PrimaryGeneratedColumn()
  driverId: number;

  @Column({
    length: 20,
  })
  Category : string;

  @OneToOne(() => Drivers, dr => dr.driverId, { eager: true, cascade: true })
  @JoinColumn()
  employees: Drivers;






}
