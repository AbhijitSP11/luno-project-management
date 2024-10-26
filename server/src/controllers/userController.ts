import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const getUsers = async (
    req: Request, 
    res: Response
):Promise<void> => {
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch(err:any){
        res.status(500).json({message: `Error retriving users ${err.message}`})
    }
};

export const postUser = async (req: Request, res: Response):Promise<void> => {
    try {
      const { email, name, password, image: profilePictureUrl } = req.body;
      let hashedPassword: string | undefined;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
  
      const user = await prisma.user.upsert({
        where: { email },
        update: {
          name,
          profilePictureUrl
        },
        create: {
          email,
          name,
          profilePictureUrl,
          password: hashedPassword || "next-auth-password",  
          username: email.split('@')[0],  
        },
      });
        res.json(user);
      } catch (error) {
        console.error('Error creating/updating user:', error);
        res.status(500).json({ error: 'Error processing request' });
      }
};

export const getAuthUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = req.user as { email: string }; 

    if (!user || !user.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const foundUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        team: true,
        authoredTasks: true,
        assignedTasks: true,
      },
    });

    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(foundUser); // Return the response here
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    if (!user.password) {
      res.status(401).json({ message: 'Account exists with different sign-in method' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const accessToken = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    const response = {
      userId: user.userId,
      email: user.email,
      name: user.name,
      accessToken,
      username: user.username,
      teamId: user.teamId,
    }
    res.json(response);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
