import express, { Application, Request, Response, NextFunction } from 'express';
import userRouter from '../routes/userRoutes';
import errorHandler from '../middleware/errorHandler';
import productRouter from '../routes/productRoutes';
import storeRouter from '../routes/storeRoutes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// parse body request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/stores', storeRouter);

// Middleware untuk menangani rute yang tidak ditemukan
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

// Middleware untuk menangani kesalahan
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
