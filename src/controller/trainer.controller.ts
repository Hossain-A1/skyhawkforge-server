import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleError } from '../errors/manage.error';
import TrainerModel from '../models/trainer.model';
import DroneModel from '../models/drone.model';

export default class TrainerController {
  constructor() {}

  public async getAllTrainers(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const trainers = await TrainerModel.find({});

        res.status(200).json(trainers);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  // get a trainer
  public async getASTrainer(req: Request, res: Response): Promise<void> {
    try {
      const { tid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(tid)) {
        res.status(404).json({ message: 'Trainer not found!' });
      }

      await Promise.resolve().then(async () => {
        const trainer = await TrainerModel.findById(tid);

        res.status(200).json(trainer);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  // create a trainer
  public async createAtrainer(req: Request, res: Response): Promise<void> {
    try {
      const { name, designation, bio, picUrl, dateOfBirth } = req.body;
      const { did } = req.params;

      if (!mongoose.Types.ObjectId.isValid(did)) {
        res.status(404).json({ message: 'Drone not found!' });
      }

      await Promise.resolve().then(async () => {
        const trainer = await TrainerModel.create({
          name,
          designation,
          bio,
          picUrl,
          dateOfBirth,
        });

        await DroneModel.findByIdAndUpdate(did, {
          $addToSet: {
            trainers: trainer._id,
          },
        });

        res.status(200).json(trainer);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  // update a trainer
  public async updateAtrainer(req: Request, res: Response): Promise<void> {
    try {
      const { name, designation, bio, photoUrl, dateOfBirth } = req.body;
      const { tid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(tid)) {
        res.status(404).json({ message: 'Trainer not found!' });
      }

      await Promise.resolve().then(async () => {
        const trainer = await TrainerModel.findByIdAndUpdate(
          {
            name,
            designation,
            bio,
            photoUrl,
            dateOfBirth,
          },
          { new: true }
        );

        res.status(200).json(trainer);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  // delete a trainer
  public async deleteATrainer(req: Request, res: Response): Promise<void> {
    try {
      const { tid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(tid)) {
        res.status(404).json({ message: 'Trainer not found!' });
      }

      await Promise.resolve().then(async () => {
        const trainer = await TrainerModel.findByIdAndDelete(tid);

        res.status(200).json(trainer);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
