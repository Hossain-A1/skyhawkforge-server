import express, { Router } from 'express';
import PaymentController from '../controller/payment.controller';
import authMiddleware from '../middlewares/auth.middleware';

const paymentInstance = new PaymentController();
const authInstance = new authMiddleware();
const paymentRouter: Router = express.Router();

// user route
paymentRouter.post(
  '/:did',
  authInstance.isAuthorized,
  paymentInstance.createStripeCheckout
);
// drone route

export default paymentRouter;
