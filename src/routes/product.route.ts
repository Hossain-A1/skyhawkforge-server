import express, { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import DronesController from '../controller/product.controller';

const authInstance = new authMiddleware();

const droneRouter: Router = express.Router();
const dronesInstance = new DronesController();

// get all drones
droneRouter.get('/', dronesInstance.getAllProducts);

// get a drone
droneRouter.get('/:did', dronesInstance.getProduct);

// create a drone
droneRouter.post(
  '/',
  authInstance.isAuthorized,
  authInstance.isAdmin,
  dronesInstance.createProduct
);
// update a drone
droneRouter.put(
  '/:did',
  authInstance.isAuthorized,
  authInstance.isAdmin,
  dronesInstance.updateProduct
);
// deleted a drone
droneRouter.delete(
  '/:did',
  authInstance.isAuthorized,
  authInstance.isAdmin,
  dronesInstance.deleteProduct
);

export default droneRouter;
