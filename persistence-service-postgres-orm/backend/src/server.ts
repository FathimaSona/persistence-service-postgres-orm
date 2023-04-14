import cors from "cors";
import express, { json } from "express";
import postgresDataSource from "./strategy/postgresql";
import PhotoApi from "./strategy/postgresql/photo";
import TruckApi from "./strategy/postgresql/truck";
import EmployeesApi from "./strategy/postgresql/employees";
import DriversApi from "./strategy/postgresql/drivers";
import BreakdowntrucksApi from "./strategy/postgresql/breakdowntrucks";
import CustomerApi from "./strategy/postgresql/customers";
import ShipmentsApi from "./strategy/postgresql/shipments";
import TrucktripApi from "./strategy/postgresql/trucktrip";
import { Employees } from "./strategy/postgresql/employees";

(async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  const datasource = await postgresDataSource.initialize();

  new PhotoApi(datasource, app);
  new TruckApi(datasource, app);
  new EmployeesApi(datasource, app);
  new DriversApi(datasource, app);
  new BreakdowntrucksApi(datasource, app);
  new CustomerApi(datasource, app);
  new ShipmentsApi(datasource, app);
  new TrucktripApi(datasource, app);

  const employee = new Employees()
  employee.empNumber = 3
  employee.FirstName = "Shehbaz"
  employee.SurName = "Gill"
  employee.Seniority = 1
  await datasource.manager.save(employee)
  console.log("Employee has been saved. Emp id is", employee.empNumber)

  await datasource
    .createQueryBuilder()
    .insert()
    .into(Employees)
    .values([
        { empNumber: 3,FirstName: "Shehbaz", SurName: "Gill", Seniority: 1 },
    ])
    .execute()

  app.get("/", (_, res) => {
    return res.send("hello world");
  });

  app.listen(8000, () => {
    console.log(`express server started on 8000`);
  });
})().catch((err) => console.log(err));
