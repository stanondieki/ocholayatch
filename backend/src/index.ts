import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Ochola Yachts API' });
});

// Import routes
// import yachtRoutes from './routes/yacht.routes';
// import walletRoutes from './routes/wallet.routes';

// Use routes
// app.use('/api/yachts', yachtRoutes);
// app.use('/api/wallet', walletRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
