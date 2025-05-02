import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_padrao';

export interface AuthRequest extends Request {
  userId?: string;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
}; 