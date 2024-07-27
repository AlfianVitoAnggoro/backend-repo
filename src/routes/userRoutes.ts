import { Router } from 'express';
import {
  getUserController,
  createUserController,
  deleteUserController,
  getUsersController,
  updateUserController,
} from '../controller/userController';
// import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();

userRouter.get('/', getUsersController);
userRouter.get('/:userId', getUserController);
userRouter.post('/', createUserController);
userRouter.put('/:userId', updateUserController);
userRouter.delete('/:userId', deleteUserController);

export default userRouter;
