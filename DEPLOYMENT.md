# Deployment Guide

## Backend Deployment (Vercel)

### Steps:
1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy Backend**:
   - Go to https://vercel.com
   - Sign up/Login with GitHub
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Set Root Directory to `server`
   - Add Environment Variables:
     - `MONGODB_URI` = `mongodb+srv://job1234:job123456@cluster0.hmbmxl3.mongodb.net/?appName=Cluster0`
     - `JWT_SECRET` = `your_jwt_secret_key_change_this_in_production`
     - `ADMIN_EMAIL` = `admin@jobportal.com`
     - `ADMIN_PASSWORD` = `admin123`
   - Click "Deploy"
   - Copy your backend URL (e.g., `https://your-backend.vercel.app`)

## Frontend Deployment (Netlify)

### Steps:
1. **Update API URL**:
   - Open `client/src/utils/api.js`
   - Change `baseURL` to your Vercel backend URL

2. **Deploy Frontend**:
   - Go to https://netlify.com
   - Sign up/Login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Set Base directory to `client`
   - Set Build command to `npm run build`
   - Set Publish directory to `client/dist`
   - Click "Deploy site"

## Alternative: Deploy Both on Render

### Backend on Render:
1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Set Root Directory to `server`
5. Set Build Command: `npm install`
6. Set Start Command: `npm start`
7. Add Environment Variables (same as above)
8. Click "Create Web Service"

### Frontend on Render:
1. Click "New" → "Static Site"
2. Connect GitHub repository
3. Set Root Directory to `client`
4. Set Build Command: `npm install && npm run build`
5. Set Publish Directory: `dist`
6. Click "Create Static Site"

## Environment Variables Needed

### Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb+srv://job1234:job123456@cluster0.hmbmxl3.mongodb.net/?appName=Cluster0
JWT_SECRET=your_jwt_secret_key_change_this_in_production
ADMIN_EMAIL=admin@jobportal.com
ADMIN_PASSWORD=admin123
```

## Post-Deployment

1. Update CORS in `server/server.js` to allow your frontend domain
2. Test admin login at `https://your-frontend.netlify.app/admin/login`
3. Add jobs from admin dashboard
4. Share your job portal URL!

## Quick Deploy Commands

### Using Vercel CLI (Backend):
```bash
cd server
vercel --prod
```

### Using Netlify CLI (Frontend):
```bash
cd client
npm install -g netlify-cli
netlify deploy --prod
```
