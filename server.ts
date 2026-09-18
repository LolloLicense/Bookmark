import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4000', // This makes the Express server accept requests from other domains
    credentials: true, // Allows cookies sent to this API
  })
);

app.use(express.static(path.join(process.cwd(), 'public')));

// Mongo
import mongoose from 'mongoose';

let connectionPromise: Promise<typeof mongoose> | null = null;

async function connectDB() {
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGODB_URL || '', {
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
      })
      .catch(error => {
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
}

// Wait for MongoDB before API requests continue
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Routes
import authRouter from './src/routes/auth';
import userRouter from './src/routes/userRoutes';
import reviewRouter from './src/routes/reviewRoutes';
import bookRouter from './src/routes/bookRoutes';

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/books', bookRouter);

// Start the express server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
