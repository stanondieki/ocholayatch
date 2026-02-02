import { Router } from 'express';
import {
  submitContact,
  getContacts,
  updateContactStatus,
  subscribeNewsletter,
  unsubscribeNewsletter,
  getSubscribers,
} from '../controllers/contact.controller';
import { authenticate, adminOnly } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/contact', submitContact);
router.post('/newsletter/subscribe', subscribeNewsletter);
router.post('/newsletter/unsubscribe', unsubscribeNewsletter);

// Admin routes
router.get('/contacts', authenticate, adminOnly, getContacts);
router.put('/contacts/:id', authenticate, adminOnly, updateContactStatus);
router.get('/newsletter/subscribers', authenticate, adminOnly, getSubscribers);

export default router;
