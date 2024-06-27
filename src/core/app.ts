import express, { Application, Request, Response, NextFunction } from 'express';
import userRouter from '../routes/userRoutes';
import errorHandler from '../middleware/errorHandler';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);

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
