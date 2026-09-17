import express from 'express';
import {
  getAllReviews,
  getSpecificReview,
  postReview,
  patchReview,
  deleteReview,
} from '../controllers/reviewController';

const router = express.Router();

import { verifyAdmin } from '../middleware/verifyAdmin';
import { verifyToken } from '../middleware/verifyToken';

router.get('/', getAllReviews);
router.get('/:id', getSpecificReview);
router.post('/', verifyToken, postReview);
router.patch('/:id', verifyToken, verifyAdmin, patchReview);
router.delete('/:id', verifyToken, verifyAdmin, deleteReview);

export default router;
