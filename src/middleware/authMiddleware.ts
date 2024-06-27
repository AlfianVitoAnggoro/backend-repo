export const authMiddleware = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (!token || token !== process.env.TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};
