import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { formatUser } from '../utils/formatUser';
import { AuthRequest } from '../middleware/verifyToken';
//GET ALL
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      res.status(200).json({
        message: 'No Users found',
      });
      return;
    }
    const formattedUsers = users.map(user => formatUser(user));
    res.json(formattedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// GET ONE
export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }
    res.json(formatUser(user));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//UPDATE
export const patchUser = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    if (req.user?.userId !== id) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    const { username, password } = req.body;
    if (username === undefined && password === undefined) {
      res.status(400).json({ message: 'At least one field is required' });
      return;
    }
    // No empty fields allowed and mininum of characters
    if (username !== undefined && username.trim().length < 3) {
      res.status(400).json({
        message: 'Unsername must be at least 3 characters',
      });
      return;
    }
    if (password !== undefined && password.trim().length < 6) {
      res.status(400).json({
        message: 'Password must be at least 6 characters',
      });
      return;
    }

    const patchFileds: Partial<{
      username: string;
      password: string;
    }> = {};
    if (username !== undefined) patchFileds.username = username;
    if (password !== undefined) {
      const hashedPassword = await bcrypt.hash(password, 10);
      patchFileds.password = hashedPassword;
    }
    const result = await User.updateOne({ _id: id }, { $set: patchFileds });
    if (result.matchedCount === 0) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }
    res.json({
      message: 'User is updated',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//DELETE
export const deleteUser = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const { password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }
    const isOwnAccount = req.user?.userId === id;
    const isAdmin = req.user?.is_admin === true;

    //Only Admin or the account user can delete account
    if (!isOwnAccount && !isAdmin) {
      res.status(403).json({
        message: 'Forbidden',
      });
      return;
    }
    // Non-admin user must confrm with password
    if (!isAdmin) {
      if (!password) {
        res.status(400).json({
          message: 'Password is required',
        });
        return;
      }
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        res.status(401).json({
          message: 'Incorrect password',
        });
        return;
      }
    }
    await User.deleteOne({ _id: id });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
