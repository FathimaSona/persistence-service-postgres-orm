import { Express } from "express";
import { DataSource } from "typeorm";
import { Employees } from "./employees";

export default class EmployeesApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/employees/:empNumber", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Employees, {
          empNumber: parseInt(req.params.empNumber),
        })
      );
    });

    this.#express.post("/employees", async (req, res) => {
      const { body } = req;
      console.log(body);

      const employees = new Employees();

      employees.empNumber = body.empNumber;
      employees.FirstName = body.FirstName;
      employees.SurName = body.SurName;
      employees.Seniority = 0;

      try {
        await this.#dataSource.manager.save(employees);
        console.log(`employee has been created with id: ${employees.empNumber}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Employees creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        empNumber: employees.empNumber,
      });
    });
  }
}
