import express, { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import UserController from '../controller/user.controller';

const isAuthorized = new authMiddleware();
const userInstance = new UserController();

const userRouter: Router = express.Router();

// get an user
userRouter.get('/:uid', isAuthorized.isAuthorized, userInstance.getAnUser);

export default userRouter;
