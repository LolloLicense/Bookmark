// Importerar Router från Express
import { Router } from 'express';

// Importerar funktionerna från bookController
import { getBooks, getBook, createBook, updateBook, deleteBook } from '../controllers/bookController';

// Importerar middleware som kontrollerar om användaren har en giltig token
import { verifyToken } from '../middleware/verifyToken';
import { verifyAdmin } from '../middleware/verifyAdmin';

// Skapar en router för books
const router = Router();

// GET /api/books
// Hämtar alla böcker
router.get('/', getBooks);

// GET /api/books/:id
// Hämtar en specifik bok
router.get('/:id', getBook);

// POST /api/books
// Skapar en ny bok
// Kräver en giltig token
router.post('/', verifyToken, verifyAdmin, createBook);

// PATCH /api/books/:id
// Uppdaterar en befintlig bok
// Kräver en giltig token
router.patch('/:id', verifyToken, verifyAdmin, updateBook);

// DELETE /api/books/:id
// Raderar en befintlig bok
// Kräver en giltig token
router.delete('/:id', verifyToken, verifyAdmin, deleteBook);

// Exporterar router så att den kan användas i API:t
export default router;
