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

// Routes
import authRouter from './src/routes/auth';
import userRouter from './src/routes/userRoutes';
import reviewRouter from './src/routes/reviewRoutes';
import bookRouter from './src/routes/bookRoutes';
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/books', bookRouter);

// Connect To DB
// Connect to DB
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || '', {
      maxPoolSize: 5,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
}

connectDB();

// Start the express server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
