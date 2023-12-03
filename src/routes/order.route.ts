import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import OrderController from '../controller/order.controller';

const orderRouter: Router = express.Router();

const authInstance = new AuthMiddleware();
const orderInstance = new OrderController();

// create an order
orderRouter.post(
  '/create/:did',
  authInstance.isAuthorized,
  orderInstance.createAnOrder
);

// delete an order
orderRouter.delete(
  '/:oid',
  authInstance.isAuthorized,
  orderInstance.deleteAnOrder
);

// get all orders
orderRouter.get(
  '/',
  authInstance.isAuthorized,
  authInstance.isAdmin,
  orderInstance.getAllOrders
);

export default orderRouter;
