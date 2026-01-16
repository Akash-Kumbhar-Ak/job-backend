# Alternative Deployment - Railway (Recommended)

Railway provides free hosting with built-in database. Much simpler than Vercel + MongoDB Atlas.

## Deploy on Railway (FREE - Includes Database)

### Backend Deployment:

1. **Go to https://railway.app**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your repository**
5. **Click "Add variables"** and add:
   ```
   MONGODB_URI=mongodb+srv://job1234:job123456@cluster0.hmbmxl3.mongodb.net/jobposting?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   ADMIN_EMAIL=admin@jobportal.com
   ADMIN_PASSWORD=admin123
   PORT=5000
   ```
6. **Set Root Directory to `server`**
7. **Click "Deploy"**
8. **Copy your Railway URL** (e.g., `https://your-app.up.railway.app`)

### Frontend Deployment:

1. **Update `client/src/utils/api.js`:**
   ```javascript
   baseURL: 'https://your-app.up.railway.app/api'
   ```
2. **Deploy on Netlify** (same as before)

---

## Alternative: Render (Also FREE)

### Backend on Render:

1. **Go to https://render.com**
2. **Sign up with GitHub**
3. **Click "New" → "Web Service"**
4. **Connect your GitHub repository**
5. **Settings:**
   - Name: `job-backend`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. **Add Environment Variables** (same as above)
7. **Click "Create Web Service"**
8. **Copy your Render URL**

### Frontend on Render:

1. **Click "New" → "Static Site"**
2. **Connect repository**
3. **Settings:**
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. **Click "Create Static Site"**

---

## Why Railway/Render is Better:

✅ **Simpler setup** - No separate database service needed
✅ **Better error logs** - Easier to debug
✅ **More reliable** - Better for Node.js apps than Vercel
✅ **Free tier** - Generous free tier for both

## Recommended: Use Railway

Railway is the easiest option with the best free tier for full-stack apps.
