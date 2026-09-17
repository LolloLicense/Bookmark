import { Types } from 'mongoose';
import { Request, Response } from 'express';
import Review from '../models/Review';
import Book from '../models/Book';

export const getAllReviews = async (_req: Request, res: Response) => {
  try {
    const result = await Review.find({}, {});
    if (result.length === 0) {
      return res.status(400).json({ error: 'No reviews found' });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews from to database' });
  }
};

export const getSpecificReview = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const review = await Review.findOne({ _id: id }, {});
    if (!review) {
      return res.status(400).json({ error: 'Review not found' });
    }
    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch review from to database' });
  }
};

export const postReview = async (req: Request, res: Response) => {
  const { name, content, rating, book_id } = req.body;
  if (!name || !content || rating === undefined || !book_id) {
    return res.status(400).json({ error: 'Name, content, rating and book_id are all required' });
  }

  try {
    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const review = await Review.create({ name, content, rating, book_id });
    return res.status(201).json({ message: 'Review added', review });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add review to database' });
  }
};

export const patchReview = async (req: Request, res: Response) => {
  const allowedFields = ['name', 'content', 'rating', 'book_id'];
  const id = req.params.id;

  let updatedFields: { [key: string]: any } = {};

  for (const field in req.body) {
    if (allowedFields.includes(field)) {
      updatedFields[field] = req.body[field];
    }
  }

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: 'Minimum of one field required to update' });
  }
  try {
    const review = await Review.updateOne({ _id: id }, { $set: updatedFields });
    return res.status(200).json({ message: 'Update sucessful', review });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update review' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const review = await Review.deleteOne({ _id: id });

    if (review.deletedCount === 0) {
      return res.status(400).json({ error: 'No review matched the id provided' });
    }
    return res.status(200).json({ message: 'Review deletet', review });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete review' });
  }
};
