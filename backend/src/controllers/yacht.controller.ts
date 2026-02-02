import { Request, Response } from 'express';
import Yacht from '../models/Yacht.model';

// Get all yachts with filtering, sorting, and pagination
export const getYachts = async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      location,
      minPrice,
      maxPrice,
      minCapacity,
      featured,
      available,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12,
    } = req.query;

    // Build filter object
    const filter: any = {};

    if (search) {
      filter.$text = { $search: search as string };
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minCapacity) {
      filter.capacity = { $gte: Number(minCapacity) };
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    if (available !== 'false') {
      filter.available = true;
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const [yachts, total] = await Promise.all([
      Yacht.find(filter).sort(sort).skip(skip).limit(limitNum),
      Yacht.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: yachts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Get yachts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get featured yachts
export const getFeaturedYachts = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 6;
    
    const yachts = await Yacht.find({ featured: true, available: true })
      .sort({ rating: -1 })
      .limit(limit);

    res.json({ success: true, data: yachts });
  } catch (error) {
    console.error('Get featured yachts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get yacht by ID
export const getYachtById = async (req: Request, res: Response) => {
  try {
    const yacht = await Yacht.findById(req.params.id);

    if (!yacht) {
      return res.status(404).json({ success: false, message: 'Yacht not found' });
    }

    res.json({ success: true, data: yacht });
  } catch (error) {
    console.error('Get yacht by ID error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create yacht (Admin only)
export const createYacht = async (req: Request, res: Response) => {
  try {
    const yacht = new Yacht(req.body);
    await yacht.save();

    res.status(201).json({ success: true, data: yacht });
  } catch (error) {
    console.error('Create yacht error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update yacht (Admin only)
export const updateYacht = async (req: Request, res: Response) => {
  try {
    const yacht = await Yacht.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!yacht) {
      return res.status(404).json({ success: false, message: 'Yacht not found' });
    }

    res.json({ success: true, data: yacht });
  } catch (error) {
    console.error('Update yacht error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete yacht (Admin only)
export const deleteYacht = async (req: Request, res: Response) => {
  try {
    const yacht = await Yacht.findByIdAndDelete(req.params.id);

    if (!yacht) {
      return res.status(404).json({ success: false, message: 'Yacht not found' });
    }

    res.json({ success: true, message: 'Yacht deleted successfully' });
  } catch (error) {
    console.error('Delete yacht error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get yacht categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Yacht.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get yacht locations
export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Yacht.distinct('location');
    res.json({ success: true, data: locations });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
