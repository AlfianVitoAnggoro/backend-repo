import { Request, Response, NextFunction } from 'express';
import ApiError from '../entities/ApiError';
import {
  createStore,
  deleteStore,
  getStores,
  updateStore,
  getStore,
} from '../repository/storeCollection';

const getStoresController = async (_req: any, res: any, next: any) => {
  try {
    const stores = await getStores();
    res.status(200).json({
      status: true,
      message: 'Stores fetched successfully',
      data: stores,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const getStoreController = async (_req: any, res: any, next: any) => {
  try {
    const storeId = _req.params.storeId;
    const store = await getStore(storeId);
    res.status(200).json({
      status: true,
      message: 'Store fetched successfully',
      data: store,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const createStoreController = async (req: any, res: any, next: any) => {
  try {
    const data = req.body;
    const store = await createStore(data);
    res.status(200).json({
      status: true,
      message: 'Store created successfully',
      data: store,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const updateStoreController = async (req: any, res: any, next: any) => {
  try {
    const storeId = req.params.storeId;
    const newData = req.body;
    const store = await updateStore(storeId, newData);
    res.status(200).json({
      status: true,
      message: 'Store updated successfully',
      data: store,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const deleteStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const storeId = req.params.storeId;
    await deleteStore(storeId);
    res
      .status(200)
      .json({ status: true, message: 'Store deleted successfully' });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

export {
  getStoresController,
  getStoreController,
  updateStoreController,
  createStoreController,
  deleteStoreController,
};
