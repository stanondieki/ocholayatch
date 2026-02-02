# Ochola Yachts

A luxury yacht booking platform with integrated crypto wallet functionality.

## Project Structure

```
ocholayatch/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   ├── components/   # Reusable UI components
│   │   ├── guidelines/   # Design system guidelines
│   │   ├── styles/       # Global and shared styles
│   │   └── types/        # TypeScript type definitions
│   └── ...
│
└── backend/           # Node.js Express backend
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Express middleware
    │   └── routes/       # API routes
    └── ...
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend API will be available at `http://localhost:5000`

## Features

- Yacht booking system
- Crypto wallet integration
- Mobile-responsive design
- Seamless luxury experience
