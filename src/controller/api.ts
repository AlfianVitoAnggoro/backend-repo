import ApiError from '../entities/ApiError';
import { getUsers, updateUser } from '../repository/userCollection';

const getUsersController = async (_req: any, res: any, next: any) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const updateUserController = async (req: any, res: any, next: any) => {
  try {
    const userId = req.params.userId;
    const newData = req.body;
    const users = await updateUser(userId, newData);
    res.status(200).json(users);
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

export { getUsersController, updateUserController };
