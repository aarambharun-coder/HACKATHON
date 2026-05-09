# PCOS Care Connect - Setup Guide

## Quick Start (5 minutes)

### 1. Prerequisites Check
```bash
node --version    # Should be v18 or higher
npm --version     # Should be v9 or higher
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup MongoDB
**Option A: Local MongoDB (Development)**
```bash
# Download from https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update .env.local

### 4. Configure Environment
```bash
# Edit .env.local
MONGODB_URI=mongodb://localhost:27017/pcos-care-connect
JWT_SECRET=your-secret-key-min-32-characters-long
```

### 5. Seed Sample Data
```bash
npm run db:seed
```

### 6. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 🧪 Testing the Application

### Test Accounts (After Seeding)
```
Patient Account:
- Email: patient@test.com
- Password: password123
- Access: Dashboard, Booking, Tracking

Doctor Account:
- Email: doctor@test.com
- Password: password123
- Access: Appointments, Patient Records

Hospital Admin:
- Email: admin@apollohospitals.com
- Password: password123
- Access: Hospital Management
```

### Test Workflows

**Patient Journey:**
1. Login as patient
2. Go to /hospitals → Find Apollo Hospitals
3. Click hospital → View doctors
4. Book appointment (future date)
5. Go to /tracker → Log symptoms
6. Visit /community → Create post
7. Try /ai-assistant → Ask health questions

**Doctor Journey:**
1. Login as doctor
2. View appointments in dashboard
3. Click appointment → Add prescription
4. Update appointment status

## 🔧 Build Commands

```bash
# Development
npm run dev          # Start dev server on port 3000

# Production Build
npm run build        # Build optimized production bundle
npm run start        # Start production server

# Linting
npm run lint         # Check code quality

# Database
npm run db:seed      # Seed sample data
```

## 📋 Feature Checklist

### Core Features Implemented ✅
- [x] User authentication (Register/Login)
- [x] Hospital discovery and filtering
- [x] Doctor search and profiles
- [x] Appointment booking system
- [x] Health tracking dashboard
- [x] Community forum
- [x] AI health assistant
- [x] Role-based access control
- [x] Responsive design
- [x] API routes for all features

### Database Models ✅
- [x] User (with 4 roles)
- [x] Hospital
- [x] Appointment
- [x] Tracker
- [x] CommunityPost
- [x] Review
- [x] Notification

### UI Components ✅
- [x] Navbar
- [x] Button (multiple variants)
- [x] Card
- [x] Input
- [x] Badge
- [x] Loading spinner

## 🎨 Customization

### Change Primary Color
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#FF6B9D',      // Change this
  'primary-dark': '#E84B7A' // And this
}
```

### Add New Hospital
```js
// POST request to /api/hospitals
{
  "name": "Your Hospital",
  "email": "hospital@example.com",
  "phone": "+91-XXXXXXXXXX",
  "address": "Address",
  "city": "City",
  "state": "State",
  "specialties": ["Gynecology", "Endocrinology"]
  // ... other fields
}
```

### Add New Doctor
```js
// Create user with role: 'doctor'
{
  "name": "Dr. Name",
  "email": "doctor@example.com",
  "role": "doctor",
  "specialization": "Gynecology",
  "experience": 10,
  "hospital": "hospital_id"
}
```

## 🚀 Deployment Checklist

### Before Deploying
- [ ] Test all features locally
- [ ] Update .env variables
- [ ] Run `npm run build` successfully
- [ ] Test with production env vars
- [ ] Check all API endpoints
- [ ] Verify authentication works

### Deploy to Vercel (1 minute)
```bash
npm install -g vercel
vercel login
vercel
```

### Deploy to AWS/GCP
1. Build: `npm run build`
2. Use `npm start` to run production server
3. Set environment variables
4. Deploy container/app

## 📊 Database Setup Verification

```bash
# Check MongoDB connection
mongo mongodb://localhost:27017/pcos-care-connect

# In MongoDB Shell:
use pcos-care-connect
db.users.countDocuments()          # Should show users
db.hospitals.countDocuments()      # Should show hospitals
db.appointments.countDocuments()   # Should show appointments
```

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `ECONNREFUSED` MongoDB | Start MongoDB service or check connection string |
| `Module not found` | Run `npm install` again |
| Port 3000 in use | Use `PORT=3001 npm run dev` |
| JWT decode error | Check `JWT_SECRET` matches in .env |
| CORS errors | Ensure API URLs match in .env |
| Build fails | Delete `.next` and `node_modules`, reinstall |

## 📞 Support

- Check logs: `npm run dev` shows detailed errors
- MongoDB Compass: Visual database tool
- VS Code Extensions: REST Client for API testing

## ✨ Next Steps After Setup

1. **Personalize**: Update hospital/doctor data
2. **Customize**: Modify colors and branding
3. **Extend**: Add new features and pages
4. **Deploy**: Push to production
5. **Monitor**: Setup error tracking
6. **Scale**: Optimize for production load

## 🎓 Learning Resources

- Next.js: https://nextjs.org/learn
- MongoDB: https://university.mongodb.com
- Tailwind CSS: https://tailwindcss.com/docs
- JWT: https://jwt.io/introduction

---

**Happy Coding! 🚀**
