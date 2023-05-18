import PickUpController from "../../controllers/pickup.controller";
import { Router } from "express";
import { Routes } from "../../interfaces/routes.interface";

class PickUpRouteV1 implements Routes {
    public path = "/api/v1/pickUp";
    public router = Router();
    public pickUpController = new PickUpController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {

      this.router.get(
        `${this.path}`,
        this.pickUpController.getAllPickUps
      );
      this.router.post(
        `${this.path}`,
        this.pickUpController.createPickUp
      );
      this.router.put(
        `${this.path}/:pickUpId`,
        this.pickUpController.updatePickup
      );
      this.router.delete(
        `${this.path}/:pickUpId`,
        this.pickUpController.deletePickup
      );
  
      
    }
  }
  
  export default PickUpRouteV1;