import { Express } from "express";
import { DataSource } from "typeorm";
import { Truck } from "./truck";

export default class TruckApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/truck/:truckNumber", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Truck, {
          truckNumber: parseInt(req.params.truckNumber),
        })
      );
    });

    this.#express.post("/truck", async (req, res) => {
      const { body } = req;
      console.log(body);

      const truck = new Truck();

      truck.truckNumber = body.truckNumber;
      truck.Brand = body.Brand;
      truck.Load = 0;
      truck.Capacity = 0;
      truck.Year = 0;
      truck.Repairs = 0;

      try {
        await this.#dataSource.manager.save(truck);
        console.log(`truck has been created with id: ${truck.truckNumber}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Truck creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        truckNumber: truck.truckNumber,
      });
    });
  }
}
