import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import JWTTokenManager from '../manager/jwt-token.manager';
import { handleError } from '../errors/manage.error';

const jwtInstance = new JWTTokenManager();

export default class AuthController {
  constructor() {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, address, phoneNo } = req.body;

      await Promise.resolve().then(async () => {
        const user = await UserModel.register(
          name,
          email,
          password,
          address,
          phoneNo
        );

        const token = jwtInstance.createToken(user._id);

        res.status(200).json({ user, token });
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      await Promise.resolve().then(async () => {
        const user = await UserModel.login(email, password);

        const token = jwtInstance.createToken(user._id);

        res.status(200).json({ user, token });
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
