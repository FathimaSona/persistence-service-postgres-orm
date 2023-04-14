import { Express } from "express";
import { DataSource } from "typeorm";
import { Breakdowntrucks } from "./breakdowntrucks";

export default class BreakdowntrucksApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/breakdowntrucks/:breakdowntruckId", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Breakdowntrucks, {
          breakdowntruckId: parseInt(req.params.breakdowntruckId),
        })
      );
    });

    this.#express.post("/breakdowntruck", async (req, res) => {
      const { body } = req;
      console.log(body);

      const breakdowntruck = new Breakdowntrucks();

      breakdowntruck.breakdowntruckId = body.breakdowntruckId;
      breakdowntruck.truckNumber = 0;
      breakdowntruck.mechanicId = 0;
      breakdowntruck.estimatedTime = 0;

      try {
        await this.#dataSource.manager.save(breakdowntruck);
        console.log(`breakdowntruck has been created with id: ${breakdowntruck.breakdowntruckId}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "BreakDownTruck creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        breakdowntruckId: breakdowntruck.breakdowntruckId,
      });
    });
  }
}
