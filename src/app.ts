import mongoose from 'mongoose';
import { urlencoded } from 'body-parser';
import express, { Request, Response } from 'express';
import { Application } from 'express-serve-static-core';
import hpp from 'hpp';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import droneRoutes from './routes/drone.route';
import trainerRoutes from './routes/trainer.route';
import orderRoutes from './routes/order.route';
import rateLimit from 'express-rate-limit';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configMiddleware();
    this.setUpRoutes();
    this.connectToTheDB();
  }

  private configMiddleware(): void {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(rateLimit({ limit: 5 }));
    this.app.use(mongoSanitize());
    this.app.use(hpp());
    this.app.use(helmet());
  }

  private setUpRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      return res
        .status(200)
        .json({ message: 'Welcome to skyHowkForge-server😊' });
    });
    // bypass Routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/auth/users', userRoutes);
    this.app.use('/api/auth/drones', droneRoutes);
    this.app.use('/api/auth/trainers', trainerRoutes);
    this.app.use('/api/auth/orders', orderRoutes);
  }

  private connectToTheDB(): void {
    const uri = process.env.MONGO_URI as string;

    mongoose
      .connect(uri)
      .then(() => {
        const port = process.env.PORT || 4000;
        this.app.listen(port, () => {
          console.log(`App connected to DB and port ${port}`);
        });
      })
      .catch((error: unknown) => {
        console.log(`You got this Error>>> ${error}`);
      });
  }
}
dotenv.config();

new App();
