import express, { Router } from 'express';
import PaymentController from '../controller/payment.controller';

const paymentInstance = new PaymentController();
const paymentRouter: Router = express.Router();

// user route
paymentRouter.post(
  '/create-checkout-session',
  paymentInstance.createStripeCheckout
);
// drone route

export default paymentRouter;
