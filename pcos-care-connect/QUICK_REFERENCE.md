# PCOS Care Connect - Quick Reference

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.local.example .env.local
# Edit .env.local and set MONGODB_URI

# 3. Run database seed
npm run db:seed

# 4. Start dev server
npm run dev

# 5. Visit http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/              # Next.js pages and routes
│   ├── api/         # API endpoints
│   ├── auth/        # Login/signup pages
│   ├── dashboard/   # Patient dashboard
│   ├── hospitals/   # Hospital discovery
│   ├── doctors/     # Doctor discovery
│   ├── tracker/     # Health tracking
│   ├── community/   # Forum
│   ├── ai-assistant/
│   ├── diet-fitness/
│   ├── emergency/
│   └── profile/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   └── UI.jsx
├── lib/             # Utilities
│   ├── auth.js      # JWT functions
│   ├── db.js        # MongoDB connection
│   ├── password.js  # Bcrypt functions
│   ├── constants.js # Data constants
│   └── middleware.js # API middleware
├── models/          # MongoDB schemas
│   ├── User.js
│   ├── Hospital.js
│   ├── Appointment.js
│   ├── Tracker.js
│   ├── CommunityPost.js
│   ├── Review.js
│   └── Notification.js
└── public/          # Static files
```

## 🔑 Key Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind styling config
- `package.json` - Dependencies & scripts
- `.env.local` - Environment variables
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Setup instructions

## 🧪 Test Credentials

```
Email: patient@test.com
Password: password123

Email: doctor@test.com
Password: password123

Email: hospital@test.com
Password: password123
```

## 📝 Common Commands

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Create production build
npm start                # Start production server

# Database
npm run db:seed          # Seed sample data

# Code Quality
npm run lint             # Run ESLint

# Database
npx mongoose-cli shell   # Connect to MongoDB
```

## 🔗 Important URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Home page |
| `http://localhost:3000/login` | Login |
| `http://localhost:3000/signup` | Register |
| `http://localhost:3000/dashboard` | Patient dashboard |
| `http://localhost:3000/hospitals` | Hospital search |
| `http://localhost:3000/doctors` | Doctor search |
| `http://localhost:3000/tracker` | Health tracker |
| `http://localhost:3000/community` | Community forum |

## 🔐 API Testing

```bash
# Using curl
curl http://localhost:3000/api/hospitals

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@test.com","password":"password123"}'

# With authentication
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/auth/me
```

## 📚 Main User Flows

### 1. Patient Registration & Login
```
/signup → /dashboard → /hospitals or /doctors → /appointments/book → /dashboard
```

### 2. Hospital Discovery
```
/hospitals → /hospitals/[id] → /doctors → /appointments/book
```

### 3. Health Tracking
```
/dashboard → /tracker → Create Entry → View History
```

### 4. Community Engagement
```
/community → View Posts → /community/[id] → Create Post
```

## 🎨 Customization

### Colors (Tailwind Theme)
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#FF6B9D',
  secondary: '#6B5FFF',
  accent: '#FF9F1C'
}
```

### Add Hospital/Doctor
```bash
# Edit scripts/seed.js
# Add more entries to hospitals or doctors array
npm run db:seed
```

### Add State/City
```bash
# Edit src/lib/constants.js
# Add to INDIAN_STATES and CITIES_BY_STATE
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
kill -9 $(lsof -ti:3000)  # macOS/Linux
netstat -ano | findstr :3000  # Windows
```

### MongoDB Connection Failed
- Start MongoDB: `mongod` (macOS/Linux) or Windows Service
- Check MONGODB_URI in .env.local
- Verify MongoDB is running: `mongosh`

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Clear Cache
```bash
rm -rf .next
npm run dev
```

## 📊 Database Schema Overview

**Users**: patient, doctor, hospital_admin, super_admin
- name, email, password, phone, gender, state, city, role

**Hospitals**: hospital information
- name, address, phone, specialties, beds, emergency services

**Doctors**: healthcare professionals
- name, specialization, experience, qualification, hospital ref

**Appointments**: booking system
- patient, doctor, hospital, date, time, status, consultation fee

**Tracker**: health logs
- date, symptoms, mood, weight, blood pressure, sleep, exercise

**Community**: forum posts
- title, content, category, tags, author, likes, comments

## 🔄 API Response Format

### Success (200-201)
```json
{
  "data": {...},
  "message": "Success"
}
```

### Error (4xx-5xx)
```json
{
  "error": "Error message"
}
```

## 🚀 Deployment

```bash
# Vercel
vercel login
vercel

# Docker
docker build -t pcos-app .
docker-compose up

# Traditional
npm run build
npm start
```

## 📖 Documentation Files

- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Detailed setup guide
- `API_DOCUMENTATION.md` - API reference
- `ENV_GUIDE.md` - Environment variables
- `DEPLOYMENT.md` - Deployment instructions
- `CONTRIBUTING.md` - Contribution guidelines

## 💡 Tips & Tricks

1. **Use localStorage for debugging**: 
   ```js
   console.log(JSON.parse(localStorage.getItem('user')))
   ```

2. **Check API response**: Open DevTools → Network tab

3. **Test authentication**: Try accessing `/dashboard` without login

4. **View database**: 
   ```bash
   mongosh
   use pcos-care-connect
   db.users.find()
   ```

5. **Restart is often the fix**: If something weird happens, try `npm run dev` again

## 🤝 Getting Help

- Check documentation files
- Search existing GitHub issues
- Check browser console for errors
- Review server logs in terminal
- Create detailed issue with screenshots

## 📱 Responsive Testing

```bash
# Chrome DevTools
F12 → Toggle Device Toolbar (Ctrl+Shift+M)

# Test breakpoints:
# sm: 640px
# md: 768px  
# lg: 1024px
# xl: 1280px
```

## ⚡ Performance Tips

- Use `npm run build && npm start` to test production build
- Check Lighthouse score: F12 → Lighthouse
- Optimize images: use next/image component
- Enable gzip compression on server

## 🔒 Security Checklist

- [ ] Set strong JWT_SECRET
- [ ] Use HTTPS in production
- [ ] Enable CORS properly
- [ ] Validate all inputs
- [ ] Use parameterized DB queries
- [ ] Keep dependencies updated
- [ ] Enable rate limiting
- [ ] Setup firewall rules

---

**Happy Coding! 🎉** If you have questions, check the full documentation or create an issue on GitHub.
