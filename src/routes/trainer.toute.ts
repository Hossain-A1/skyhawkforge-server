import express, { Router } from 'express';

import authMiddleware from '../middlewares/auth.middleware';
import TrainerController from '../controller/trainer.controller';

const trainerRouter: Router = express.Router();

const authInstance = new authMiddleware();
const trainerInstance = new TrainerController();
// get all trainer
trainerRouter.get('/', trainerInstance.getAllTrainers);

// get a trainer
trainerRouter.get('/:tid', trainerInstance.getASTrainer);

// create a trainer
trainerRouter.post(
  '/:did',
  authInstance.isAuthorized,
  authInstance.isAdmin,
  trainerInstance.createAtrainer
);

// update a trainer
trainerRouter.put(
  '/:tid',
  authInstance.isAuthorized,
  authInstance.isAdmin,
  trainerInstance.updateAtrainer
);

// delete a trainer
trainerRouter.delete(
  '/:tid',
  authInstance.isAuthorized,
  authInstance.isAdmin,
  trainerInstance.deleteATrainer
);

export default trainerRouter;
