import { Router } from 'express';
import { UserController } from '../controllers/userController.ts';

const userRouter = Router();
const controller = new UserController();

userRouter.get('/', (req, res) => controller.getUsers(req, res));
userRouter.post('/', (req, res) => controller.createUser(req, res));

export { userRouter };