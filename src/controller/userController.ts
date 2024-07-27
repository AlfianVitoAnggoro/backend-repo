import { Request, Response, NextFunction } from 'express';
import ApiError from '../entities/ApiError';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  getUser,
} from '../repository/userCollection';

const getUsersController = async (_req: any, res: any, next: any) => {
  try {
    const users = await getUsers();
    res.status(200).json({
      status: true,
      message: 'User fetched successfully',
      data: users,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const getUserController = async (_req: any, res: any, next: any) => {
  try {
    const userId = _req.params.userId;
    const user = await getUser(userId);
    res.status(200).json({
      status: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const createUserController = async (req: any, res: any, next: any) => {
  try {
    const data = req.body;
    const users = await createUser(data);
    res.status(200).json({
      status: true,
      message: 'User created successfully',
      data: users,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const updateUserController = async (req: any, res: any, next: any) => {
  try {
    const userId = req.params.userId;
    const newData = req.body;
    const users = await updateUser(userId, newData);
    res.status(200).json({
      status: true,
      message: 'User updated successfully',
      data: users,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;
    await deleteUser(userId);
    res
      .status(200)
      .json({ status: true, message: 'User deleted successfully' });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

export {
  getUsersController,
  getUserController,
  updateUserController,
  createUserController,
  deleteUserController,
};
