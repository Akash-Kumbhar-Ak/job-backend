# Job Posting Platform

Admin-only job posting platform where admins manage jobs and visitors view/apply without login.

## Features
- Admin authentication (JWT)
- CRUD operations for jobs
- Public job listing with search/filter
- Mobile-responsive UI

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB

## Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)

### MongoDB Atlas Setup
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free M0 tier)
3. Create database user with username and password
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get connection string from "Connect" > "Connect your application"
6. Replace `<username>`, `<password>`, and cluster URL in `.env` file

### Backend Setup
```bash
cd server
npm install
# Update MONGODB_URI in .env with your MongoDB Atlas connection string
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Default Admin Credentials
- Email: `admin@jobportal.com`
- Password: `admin123`

## API Endpoints

### Public
- `GET /api/jobs` - Get all active jobs (with filters)
- `GET /api/jobs/:id` - Get single job

### Admin (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/admin/jobs` - Get all jobs
- `POST /api/admin/jobs` - Create job
- `PUT /api/admin/jobs/:id` - Update job
- `DELETE /api/admin/jobs/:id` - Delete job

## URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Admin Login: http://localhost:3000/admin/login
