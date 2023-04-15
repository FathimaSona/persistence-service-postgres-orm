import { DataSource } from "typeorm";
import { Photo } from "./photo/photo";
import { Truck } from "./truck/truck";
import { Employees } from "./employees/employees";
import { Mechanic } from "./mechanic/mechanic";
import { Drivers } from "./drivers/drivers";
import { Breakdowntrucks } from "./breakdowntrucks/breakdowntrucks";
import { Customer } from "./customers/customer";
import { Shipments } from "./shipments/shipments";
import { Trucktrip } from "./trucktrip/trucktrip";

export const postgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER||"pg",
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Breakdowntrucks,Customer,Drivers,Employees,Mechanic,Shipments,Truck,Trucktrip],
  synchronize: true,
  logging: false,
});

