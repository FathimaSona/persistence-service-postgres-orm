import { Express } from "express";
import { DataSource } from "typeorm";
import { Shipments } from "./shipments";

export default class ShipmentsApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/shipments/:shipmentId", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Shipments, {
          shipmentId: parseInt(req.params.shipmentId),
        })
      );
    });

    this.#express.post("/shipments", async (req, res) => {
      const { body } = req;
      console.log(body);

      const shipment = new Shipments();

      shipment.shipmentId = body.shipmentId;
      shipment.customerId = body.customerId;
      shipment.orgin = body.orgin;
      shipment.destination = body.destination;
      shipment.weights = 0;
      shipment.values = 0;

      try {
        await this.#dataSource.manager.save(shipment);
        console.log(`Shipment has been created with id: ${shipment.shipmentId}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Shipment creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        shipmentId: shipment.shipmentId,
      });
    });
  }
}
