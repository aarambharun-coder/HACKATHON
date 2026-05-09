# PCOS Care Connect 🩺

A comprehensive full-stack healthcare platform connecting women with PCOS specialists, hospitals, and support communities across India.

## 🌟 Features

### For Patients
- **Hospital & Doctor Discovery**: Find verified hospitals and specialists by state, city, and specialty
- **Easy Appointment Booking**: Book, reschedule, and manage appointments
- **PCOS Symptom Tracking**: Track symptoms, menstrual cycles, mood, weight, and health metrics
- **Personalized Dashboard**: View upcoming appointments, tracking history, and health scores
- **Community Support**: Join discussions, share experiences, and connect with others
- **AI Health Assistant**: Get instant answers to PCOS-related questions 24/7
- **Health Insights**: Visual charts and analytics of health data
- **Telemedicine Support**: Virtual consultation capability

### For Doctors
- **Professional Profile**: Showcase qualifications, experience, and services
- **Appointment Management**: View and manage patient appointments
- **Patient Records**: Access patient history and tracking data
- **Prescription Management**: Send prescriptions and health recommendations

### For Hospitals
- **Hospital Management**: Manage bed availability, services, and departments
- **Doctor Administration**: Manage doctor profiles and schedules
- **Appointment Oversight**: Monitor all hospital appointments
- **Analytics Dashboard**: View hospital statistics and performance metrics

### For Super Admin
- **Complete Management**: Manage hospitals, doctors, and users
- **System Analytics**: View platform-wide statistics and reports
- **Content Moderation**: Monitor community content and ensure quality

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Components**: Custom UI components
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Notifications**: React Hot Toast

### Backend
- **Framework**: Next.js API Routes (Node.js compatible)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer (placeholder for integration)

### DevOps & Deployment
- **Containerization**: Docker ready
- **Environment Management**: dotenv
- **Version Control**: Git

## 📁 Project Structure

```
pcos-care-connect/
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── hospitals/     # Hospital management
│   │   │   ├── doctors/       # Doctor management
│   │   │   ├── appointments/  # Appointment system
│   │   │   ├── tracker/       # Health tracking
│   │   │   └── community/     # Community features
│   │   ├── dashboard/         # Patient dashboard
│   │   ├── hospitals/         # Hospital discovery pages
│   │   ├── doctors/           # Doctor discovery pages
│   │   ├── tracker/           # Health tracker
│   │   ├── community/         # Community pages
│   │   ├── ai-assistant/      # AI chatbot
│   │   ├── login/             # Login page
│   │   ├── signup/            # Registration page
│   │   ├── page.js            # Landing page
│   │   ├── layout.js          # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation component
│   │   └── UI.jsx             # Reusable UI components
│   ├── models/                # Database schemas
│   │   ├── User.js
│   │   ├── Hospital.js
│   │   ├── Appointment.js
│   │   ├── Tracker.js
│   │   ├── CommunityPost.js
│   │   ├── Review.js
│   │   └── Notification.js
│   └── lib/
│       ├── db.js              # MongoDB connection
│       ├── auth.js            # JWT utilities
│       ├── password.js        # Password hashing
│       └── constants.js       # App constants
├── public/                    # Static assets
├── scripts/
│   └── seed.js               # Database seeding
├── package.json
├── .env.local               # Environment variables
├── next.config.js           # Next.js config
├── tailwind.config.js       # Tailwind config
├── tsconfig.json            # TypeScript config
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud - MongoDB Atlas recommended)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aarambharun-coder/HACKATHON.git
cd pcos-care-connect
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.local .env.local
# Edit .env.local with your configuration
```

4. **Configure MongoDB**
```bash
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/pcos-care-connect

# Option 2: MongoDB Atlas (Recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pcos-care-connect
```

5. **Seed the database** (optional - creates sample data)
```bash
npm run db:seed
```

6. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication

### User Roles
- **Patient**: Regular users seeking healthcare
- **Doctor**: Medical professionals
- **Hospital Admin**: Hospital staff managing operations
- **Super Admin**: Platform administrators

### Login Credentials (After Seeding)
```
Patient:
Email: patient@test.com
Password: password123

Doctor:
Email: doctor@test.com
Password: password123

Hospital Admin:
Email: admin@apollohospitals.com
Password: password123
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Hospital Endpoints
- `GET /api/hospitals` - Get all hospitals with filters
- `GET /api/hospitals/[id]` - Get hospital details
- `POST /api/hospitals` - Create hospital (admin only)

### Doctor Endpoints
- `GET /api/doctors` - Get all doctors with filters
- `GET /api/doctors/[id]` - Get doctor details

### Appointment Endpoints
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/[id]` - Get appointment details
- `PATCH /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Cancel appointment

### Tracker Endpoints
- `GET /api/tracker` - Get tracking entries
- `POST /api/tracker` - Create tracking entry
- `GET /api/tracker/[id]` - Get specific entry
- `PATCH /api/tracker/[id]` - Update entry

### Community Endpoints
- `GET /api/community` - Get posts
- `POST /api/community` - Create post
- `GET /api/community/[id]` - Get post details
- `PATCH /api/community/[id]` - Update post
- `POST /api/community/[id]/like` - Like/unlike post

## 🎨 UI Components

### Reusable Components
- `Button` - Primary, secondary, outline, ghost variants
- `Card` - Container with shadow and hover effects
- `Input` - Text input with label and error handling
- `Badge` - Status badges with multiple variants
- `Loading` - Loading spinner animation
- `Navbar` - Navigation header

## 🗄️ Database Schema

### User Collection
- Basic info: name, email, phone, gender, DOB
- Location: state, city, address
- Role: patient, doctor, hospital_admin, super_admin
- Doctor fields: specialization, qualification, experience
- Timestamps: createdAt, updatedAt

### Hospital Collection
- Basic info: name, email, phone, address
- Services: specialties, departments, beds
- Emergency: emergencyServices, ambulance
- Verification: isVerified, rating, reviews
- Geolocation: latitude, longitude

### Appointment Collection
- Patient & Doctor references
- Date/Time scheduling
- Status: scheduled, completed, cancelled
- Consultation type: in-person, telemedicine
- Medical notes: reason, symptoms, prescription

### Tracker Collection
- Cycle tracking: period dates, intensity
- Daily logs: mood, symptoms, weight, BP
- Wellness: sleep, exercise, water intake
- Health scores: pain level, medication tracking

### Community Post Collection
- Title, content, category
- Author & anonymous posting
- Engagement: likes, comments, views
- Tags & pinning capability

## 🔒 Security Features

- JWT authentication with secure tokens
- Password hashing with bcryptjs
- Role-based access control (RBAC)
- Protected API routes
- Input validation with Zod
- Environment variable protection
- HIPAA-inspired healthcare privacy

## 📊 Performance Optimizations

- Next.js image optimization
- Code splitting and lazy loading
- MongoDB indexing for fast queries
- Pagination for large datasets
- Caching strategies
- Responsive design for all devices

## 🎯 Key Workflows

### Patient Journey
1. Sign up → Create account
2. Find hospital/doctor → Search and filter
3. Book appointment → Select date/time
4. Track symptoms → Daily logging
5. View history → Check past visits
6. Join community → Share experiences
7. Use AI assistant → Get recommendations

### Doctor Workflow
1. Register → Create profile
2. Manage appointments → View scheduled sessions
3. Access patient data → Review tracking history
4. Send prescriptions → Digital prescription delivery

### Hospital Admin Flow
1. Manage hospital → Update info and services
2. Manage doctors → Add/edit doctor profiles
3. View appointments → Oversee bookings
4. Check analytics → Monitor performance

## 🚀 Deployment

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel login
vercel
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/db
JWT_SECRET=your-production-secret-key
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints
- Flexible grid layouts
- Touch-friendly interfaces
- Optimized mobile navigation

## 🤖 AI Assistant Features

- PCOS symptom information
- Diet and fitness recommendations
- Medication guidance
- Fertility counseling
- Stress management tips
- 24/7 availability
- Natural language processing

## 🔄 Real-time Features

- Live notification system (placeholder)
- Appointment reminders
- Community notifications
- Health alert system

## 📈 Analytics & Reporting

- Personal health dashboards
- Tracking charts and graphs
- Hospital performance metrics
- Doctor ratings and reviews
- Community engagement stats

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
# For local: mongod should be running
# For Atlas: Check connection string and whitelist IP
```

### Port Already in Use
```bash
# Use a different port
PORT=3001 npm run dev
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Team

Built for hackathons and healthcare innovation by developers passionate about women's health.

## 📧 Contact & Support

- Email: support@pcoscareconnect.com
- Emergency: 1-800-PCOS-HELP
- Website: www.pcoscareconnect.com

## ⚕️ Medical Disclaimer

This platform provides health information and tools for PCOS management but is not a substitute for professional medical advice. Always consult with qualified healthcare providers for diagnosis and treatment.

---

**Made with ❤️ for women's health and wellbeing**
