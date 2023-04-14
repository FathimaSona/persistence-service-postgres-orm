import { Express } from "express";
import { DataSource } from "typeorm";
import { Customer } from "./customer";

export default class TruckApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/customer/:customerId", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Customer, {
          customerId: parseInt(req.params.customerId),
        })
      );
    });

    this.#express.post("/customer", async (req, res) => {
      const { body } = req;
      console.log(body);

      const customer = new Customer();

      customer.customerId = body.customerId;
      customer.customerName = body.customerName;
      customer.address = body.address;
      customer.phoneNo1 = 0;
      customer.phoneNo2 = 0;

      try {
        await this.#dataSource.manager.save(customer);
        console.log(`customer has been created with id: ${customer.customerId}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Customer creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        customerId: customer.customerId,
      });
    });
  }
}
