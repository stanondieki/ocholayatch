import { Router } from 'express';
import {
  getYachts,
  getFeaturedYachts,
  getYachtById,
  createYacht,
  updateYacht,
  deleteYacht,
  getCategories,
  getLocations,
} from '../controllers/yacht.controller';
import { authenticate, adminOnly } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getYachts);
router.get('/featured', getFeaturedYachts);
router.get('/categories', getCategories);
router.get('/locations', getLocations);
router.get('/:id', getYachtById);

// Admin routes
router.post('/', authenticate, adminOnly, createYacht);
router.put('/:id', authenticate, adminOnly, updateYacht);
router.delete('/:id', authenticate, adminOnly, deleteYacht);

export default router;
