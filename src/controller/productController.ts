import { Request, Response, NextFunction } from 'express';
import ApiError from '../entities/ApiError';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProduct,
} from '../repository/productCollection';

const getProductsController = async (_req: any, res: any, next: any) => {
  try {
    const products = await getProducts();
    res.status(200).json({
      status: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const getProductController = async (_req: any, res: any, next: any) => {
  try {
    const productId = _req.params.productId;
    const product = await getProduct(productId);
    res.status(200).json({
      status: true,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const createProductController = async (req: any, res: any, next: any) => {
  try {
    const data = req.body;
    const product = await createProduct(data);
    res.status(200).json({
      status: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const updateProductController = async (req: any, res: any, next: any) => {
  try {
    const productId = req.params.productId;
    const newData = req.body;
    const product = await updateProduct(productId, newData);
    res.status(200).json({
      status: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.productId;
    await deleteProduct(productId);
    res
      .status(200)
      .json({ status: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    next(new ApiError(404, error.message));
  }
};

export {
  getProductsController,
  getProductController,
  updateProductController,
  createProductController,
  deleteProductController,
};
