import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductsController,
  updateProductController,
  getProductController,
} from '../controller/productController';
// import { authMiddleware } from '../middleware/authMiddleware';

const productRouter = Router();

productRouter.get('/', getProductsController);
productRouter.get('/:productId', getProductController);
productRouter.post('/', createProductController);
productRouter.put('/:productId', updateProductController);
productRouter.delete('/:productId', deleteProductController);

export default productRouter;
