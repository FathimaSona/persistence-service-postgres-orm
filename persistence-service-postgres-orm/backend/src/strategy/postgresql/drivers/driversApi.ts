import { Express } from "express";
import { DataSource } from "typeorm";
import { Drivers } from "./drivers";

export default class DriversApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/drivers/:driverId", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Drivers, {
          driverId: parseInt(req.params.driverId),
        })
      );
    });

    this.#express.post("/drivers", async (req, res) => {
      const { body } = req;
      console.log(body);

      const drivers = new Drivers();

      drivers.driverId = body.driverId;
      drivers.Category = body.Category;
      
      try {
        await this.#dataSource.manager.save(drivers);
        console.log(`driver has been created with id: ${drivers.driverId}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Drivers creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        driverId: drivers.driverId,
      });
    });
  }
}
