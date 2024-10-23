import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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

export const getUser = async (
    req: Request, 
    res: Response
):Promise<void> => {
    const {cognitoId} = req.params;
     try{
        // const user = await prisma.user.findUnique({
        //     where: {
        //         cognitoId: cognitoId
        //     }
        // });
        // res.json(user);
    }
    catch(err:any){
        res.status(500).json({message: `Error retriving user ${err.message}`})
    }
};

export const postUser = async (req: Request, res: Response):Promise<void> => {
  console.log("postuser req.body", req.body)
    try {
      const { email, name, image: profilePictureUrl } = req.body;

      const user = await prisma.user.upsert({
        where: { email }, 
        update: { name, profilePictureUrl }, 
        create: {
          email,
          name,
          profilePictureUrl,
          username: email.split('@')[0],
        },
      });
        res.json(user);
      } catch (error) {
        console.error('Error creating/updating user:', error);
        res.status(500).json({ error: 'Error processing request' });
      }
};

export const getAuthUser = async (req:Request, res:Response):Promise<void> => {
  console.log("req user request recieved", req.user) 
    try {
      const email = req.user.email;

      console.log("email found: ", email);

      const user = await prisma.user.findUnique({
        where: { email }, 
        include: {
          team: true,
          authoredTasks: true,
          assignedTasks: true,
        },
      });

      console.log("user found: ", user);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }