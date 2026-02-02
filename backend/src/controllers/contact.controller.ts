import { Request, Response } from 'express';
import Contact from '../models/Contact.model';
import Newsletter from '../models/Newsletter.model';

// Submit contact form
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message, interest } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      interest,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all contacts (Admin)
export const getContacts = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter: any = {};
    if (status && status !== 'all') filter.status = status;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Contact.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update contact status (Admin)
export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Subscribe to newsletter
export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.isActive) {
        return res.status(400).json({ success: false, message: 'Email already subscribed' });
      } else {
        // Reactivate subscription
        existing.isActive = true;
        existing.unsubscribedAt = undefined;
        await existing.save();
        return res.json({ success: true, message: 'Welcome back! Your subscription has been reactivated.' });
      }
    }

    const newsletter = new Newsletter({ email });
    await newsletter.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
    });
  } catch (error) {
    console.error('Subscribe newsletter error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Unsubscribe from newsletter
export const unsubscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const newsletter = await Newsletter.findOneAndUpdate(
      { email },
      { isActive: false, unsubscribedAt: new Date() },
      { new: true }
    );

    if (!newsletter) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    res.json({ success: true, message: 'You have been unsubscribed successfully' });
  } catch (error) {
    console.error('Unsubscribe newsletter error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all subscribers (Admin)
export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const { active, page = 1, limit = 50 } = req.query;

    const filter: any = {};
    if (active === 'true') filter.isActive = true;
    if (active === 'false') filter.isActive = false;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [subscribers, total] = await Promise.all([
      Newsletter.find(filter).sort({ subscribedAt: -1 }).skip(skip).limit(limitNum),
      Newsletter.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: subscribers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
