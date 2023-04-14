import { Express } from "express";
import { DataSource } from "typeorm";
import { Trucktrip } from "./trucktrip";

export default class TrucktripApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/trucktrip/:tripId", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Trucktrip, {
          tripId: parseInt(req.params.tripId),
        })
      );
    });

    this.#express.post("/trucktrip", async (req, res) => {
      const { body } = req;
      console.log(body);

      const trucktrip = new Trucktrip();

      trucktrip.tripId = body.tripId;
      trucktrip.tripOrgin = body.tripOrgin;
      trucktrip.tripDestination = body.tripDestination;
      trucktrip.truckNumber = 0;
      trucktrip.noOfDrivers = 0;
      trucktrip.driverId = 0;
      trucktrip.shipmentId = 0;

      try {
        await this.#dataSource.manager.save(trucktrip);
        console.log(`trucktrip has been created with id: ${trucktrip.tripId}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Trucktrip creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        tripId: trucktrip.tripId,
      });
    });
  }
}
