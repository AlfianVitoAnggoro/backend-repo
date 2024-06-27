import { Router } from 'express';
import { getUsersController, updateUserController } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();

userRouter.get('/', authMiddleware, getUsersController);
// Contoh endpoint untuk meng-handle permintaan update user berdasarkan ID
userRouter.put('/:userId', authMiddleware, updateUserController);
// userRouter.put('/:id', authMiddleware, apiController.updateUserData);

export default userRouter;
