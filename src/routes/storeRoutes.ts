import { Router } from 'express';
import {
  createStoreController,
  deleteStoreController,
  getStoresController,
  updateStoreController,
  getStoreController,
} from '../controller/storeController';
// import { authMiddleware } from '../middleware/authMiddleware';

const storeRouter = Router();

storeRouter.get('/', getStoresController);
storeRouter.get('/:storeId', getStoreController);
storeRouter.post('/', createStoreController);
storeRouter.put('/:storeId', updateStoreController);
storeRouter.delete('/:storeId', deleteStoreController);

export default storeRouter;
