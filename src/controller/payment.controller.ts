import { Request, Response } from 'express';
import { droneType } from '../types/drone.type';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

if (!stripe) {
  console.error('STRIPE_SECRET_KEY is not defined');
}

export default class PaymentController {
  constructor() {}

  public async createStripeCheckout(req: Request, res: Response) {
    try {
      const { items, name, email, mobile, address, courseTitle, courseId } =
        req.body;

      const transformedItems = items.map((item: any) => ({
        quantity: 1,
        price_data: {
          currency: 'USD',
          unit_amount: +(item.price * 100).toFixed(2),
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.images],
          },
        },
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}`,
        metadata: {
          name,
          email,
          mobile,
          address,
          courseTitle,
          courseId,
          images: JSON.stringify(
            items.map((item: droneType) => item.images[0])
          ),
        },
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      res
        .status(404)
        .json({ message: 'Error in createStripeCheckout:', error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
