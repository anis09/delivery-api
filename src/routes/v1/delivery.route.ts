import DeliveryController from "../../controllers/delivery.controller";
import { Router } from "express";
import { Routes } from "../../interfaces/routes.interface";

class DeliveryRouteV1 implements Routes {
    public path = "/api/v1/delivery";
    public router = Router();
    public deliveryController = new DeliveryController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {

      this.router.get(
        `${this.path}`,
        this.deliveryController.getAllDeliveries
      );
      this.router.post(
        `${this.path}`,
        this.deliveryController.createDelivery
      );
      this.router.put(
        `${this.path}/:deliveryId`,
        this.deliveryController.updateDelivery
      );
      this.router.delete(
        `${this.path}/:deliveryId`,
        this.deliveryController.deleteDelivery
      );
  
      
    }
  }
  
  export default DeliveryRouteV1;