import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mechanic {
  @PrimaryGeneratedColumn()
  mechanicId: number;

  @Column({
    length: 100,
  })
  brandSpecialist: string;

}
