"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class PaymentController {
    constructor() { }
    async createStripeCheckout(req, res) {
        const { items, name, email, mobile, address, courseTitle, courseId } = req.body;
        const transformedItems = items.map((item) => ({
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
                images: JSON.stringify(items.map((item) => item.images[0])),
            },
        });
        res.status(200).json({ id: session.id });
    }
}
exports.default = PaymentController;
