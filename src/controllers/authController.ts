import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { AuthRequest } from '../middleware/verifyToken';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === undefined || password === undefined) {
    res.status(400).json({ message: 'username and password are required' });
    return;
  }
  if (username.trim().length < 3) {
    res.status(400).json({
      field: 'username',
      message: 'Username must be at least 3 characters',
    });
    return;
  }
  if (password.trim().length < 6) {
    res.status(400).json({
      field: 'password',
      message: 'Password must be at least 6 characters',
    });
    return;
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({
        field: 'username',
        message: 'Username already exists',
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'You are registered',
      username: user.username,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (username === undefined || password === undefined) {
      res.status(400).json({ message: 'username and password are required' });
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({
        message: 'Invalid username OR password',
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        message: 'Invalid username OR password',
      });
      return;
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        is_admin: user.is_admin,
      },
      process.env.JWT_SECRET || '',
      { expiresIn: '7d' }
    );

    res.cookie('accessToken', accessToken, {
      // Prevents client-side JavaScript from accessing the cookie (e.g. document.cookie).
      // This protects against XSS attacks where malicious scripts try to steal the token.
      httpOnly: true, // JS has no access to the cookie

      // When true, the cookie is only sent over HTTPS connections.
      // We enable this in production (where we use HTTPS) but disable it locally (HTTP).
      secure: process.env.NODE_ENV === 'production',

      // Controls when the cookie is sent with cross-site requests.
      // 'none': Cookie is sent on all cross-origin requests (required when frontend and API are on different domains in production). Requires secure: true.
      // 'lax': Cookie is sent on same-site requests and top-level navigations (safe default for local development).
      sameSite: 'lax',

      // How long the cookie lives in the browser, in milliseconds.
      // After this time the browser automatically deletes the cookie and the user must log in again.
      maxAge: 1000 * 60 * 60 * 24 * 7, // Lives on for 7 days
    });
    res.json({
      message: 'You are logged in',
      user: {
        id: user.id,
        username: user.username,
        is_admin: user.is_admin,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const getMe = (req: AuthRequest, res: Response) => {
  res.json({
    user: req.user,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.json({ message: 'You are logged out' });
};
