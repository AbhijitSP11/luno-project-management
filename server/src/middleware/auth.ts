import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("All headers:", req.headers);
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);
    
    if (!authHeader?.startsWith('Bearer ')) {
      console.log("No valid auth header found");
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token to verify:", token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      console.log("Decoded token:", decoded);
      req.user = decoded;
      next();
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error("Middleware error:", error);
    return res.status(401).json({ error: 'Authorization failed' });
  }
};