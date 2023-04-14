import { Express } from "express";
import { DataSource } from "typeorm";
import { Mechanic } from "./mechanic";

export default class MechanicApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/mechanic/:mechanicId", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Mechanic, {
          mechanicId: parseInt(req.params.mechanicId),
        })
      );
    });

    this.#express.post("/mechanic", async (req, res) => {
      const { body } = req;
      console.log(body);

      const mechanic = new Mechanic();

      mechanic.mechanicId = body.mechanicId;
      mechanic.brandSpecialist = body.brandSpecialist;
      
      try {
        await this.#dataSource.manager.save(mechanic);
        console.log(`Mechanic has been created with id: ${mechanic.mechanicId}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Mechanic creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        mechanicId: mechanic.mechanicId,
      });
    });
  }
}
