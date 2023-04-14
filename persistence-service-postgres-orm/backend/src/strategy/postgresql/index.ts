export { postgresDataSource as default } from "./configure";
import { Employees } from "./employees/employees";
import { DataSource } from "typeorm";

//const entityManager = getManager();

const employeeRepository = DataSource.getRepository(Employees)

const employee = new Employees()
employee.empNumber = 3
employee.FirstName = "Shehbaz’"
employee.SurName = "Gill’"
employee.Seniority = 1
await employeeRepository.save(employee)
