# PCOS Care Connect - Environment Variables Guide

## Development Environment (.env.local)

```bash
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/pcos-care-connect
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/pcos-care-connect

# JWT Configuration
JWT_SECRET=your-secret-key-minimum-32-characters-long
JWT_EXPIRE=7d

# Node Environment
NODE_ENV=development

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API URL (for internal API calls)
API_URL=http://localhost:3000/api

# Email Configuration (Optional - for sending notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@pcoscare.com

# Google Maps API (Optional - for location features)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Stripe/Razorpay (Optional - for payments)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

NEXT_PUBLIC_RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret
```

## Production Environment (.env.production)

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://production-user:production-pass@prod-cluster.mongodb.net/pcos-care-connect

# JWT Configuration
JWT_SECRET=production-secret-key-minimum-32-characters-long-change-this
JWT_EXPIRE=7d

# Node Environment
NODE_ENV=production

# Application URL
NEXT_PUBLIC_APP_URL=https://pcoscare.com

# API URL
API_URL=https://api.pcoscare.com/api

# Email Configuration
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxx
SMTP_FROM=noreply@pcoscare.com

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=production-google-maps-key

# Analytics
NEXT_PUBLIC_GA_ID=production-analytics-id

# Payment
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

NEXT_PUBLIC_RAZORPAY_KEY_ID=production-key-id
RAZORPAY_KEY_SECRET=production-key-secret
```

## Docker Environment (.env.docker)

```bash
# MongoDB Configuration
MONGODB_URI=mongodb://mongodb:27017/pcos-care-connect

# JWT Configuration
JWT_SECRET=docker-secret-key-change-this
JWT_EXPIRE=7d

# Node Environment
NODE_ENV=development

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API URL
API_URL=http://localhost:3000/api
```

## Environment Variable Descriptions

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | ✅ Yes | MongoDB connection string | `mongodb://localhost:27017/db-name` |
| `JWT_SECRET` | ✅ Yes | Secret key for JWT signing (min 32 chars) | `your-super-secret-key-here` |
| `JWT_EXPIRE` | ✅ Yes | JWT token expiration time | `7d`, `24h`, `1w` |
| `NODE_ENV` | ✅ Yes | Environment type | `development`, `production`, `test` |
| `NEXT_PUBLIC_APP_URL` | ✅ Yes | Public application URL | `http://localhost:3000` |
| `API_URL` | ✅ Yes | Internal API URL | `http://localhost:3000/api` |
| `SMTP_HOST` | ❌ No | Email server host | `smtp.gmail.com` |
| `SMTP_PORT` | ❌ No | Email server port | `587`, `465` |
| `SMTP_USER` | ❌ No | Email account username | `user@gmail.com` |
| `SMTP_PASS` | ❌ No | Email account password/token | `app-password` |
| `SMTP_FROM` | ❌ No | Sender email address | `noreply@pcoscare.com` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | ❌ No | Google Maps API key | API key from Google Cloud Console |
| `NEXT_PUBLIC_GA_ID` | ❌ No | Google Analytics tracking ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | ❌ No | Stripe public key (test/live) | `pk_test_xxxxx` |
| `STRIPE_SECRET_KEY` | ❌ No | Stripe secret key | `sk_test_xxxxx` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | ❌ No | Razorpay API key ID | Key from Razorpay dashboard |
| `RAZORPAY_KEY_SECRET` | ❌ No | Razorpay API key secret | Secret from Razorpay dashboard |

## Setup Instructions

### 1. Copy Template to .env.local

```bash
cp .env.local.example .env.local
```

### 2. Fill in Required Variables

Edit `.env.local` and set:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Generate a strong random string (min 32 chars)
- `JWT_EXPIRE` - Token expiration time (default: 7d)
- `NEXT_PUBLIC_APP_URL` - Your app URL

### 3. (Optional) Set Email Configuration

If you want email notifications:
1. Create Gmail app-specific password
2. Set `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`

### 4. (Optional) Setup Payment Gateway

For payment features:
1. Get Razorpay/Stripe keys from dashboards
2. Add `RAZORPAY_KEY_ID` or `STRIPE_PUBLIC_KEY`

### 5. (Optional) Setup Google Maps

For location features:
1. Get Google Maps API key
2. Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### 6. Start Development Server

```bash
npm run dev
```

## Generate JWT Secret

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object { [char](Get-Random -Minimum 33 -Maximum 127) })))

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## MongoDB Setup

### Local Installation
```bash
# macOS
brew install mongodb-community

# Windows
# Download from: https://www.mongodb.com/try/download/community

# Ubuntu
sudo apt-get install -y mongodb
```

### MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and cluster
3. Get connection string
4. Replace `<password>` in connection string

## Verifying Environment Setup

```bash
# Check MongoDB connection
echo "MONGODB_URI: $MONGODB_URI"

# Test MongoDB connection
mongosh "$MONGODB_URI"

# Verify Node.js version (should be 18+)
node --version

# Verify npm packages
npm list

# Run development server
npm run dev
```

## Common Issues

### MongoDB Connection Failed
- Check MONGODB_URI is correct
- Ensure MongoDB service is running
- Whitelist your IP in MongoDB Atlas

### JWT Errors
- Ensure JWT_SECRET is set and minimum 32 characters
- Restart development server after changing

### Email Not Sending
- Verify SMTP credentials
- Check firewall/port 587 or 465
- Enable "Less secure app" for Gmail

### Port 3000 Already in Use
```bash
# On macOS/Linux
kill -9 $(lsof -ti:3000)

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Security Best Practices

⚠️ **IMPORTANT:**
- Never commit `.env.local` to Git
- Use strong, random JWT_SECRET (min 32 chars)
- Keep API keys private and secure
- Use different secrets for dev/production
- Rotate secrets periodically
- Use environment variables for all sensitive data

## Docker Environment

For Docker deployment, mount .env.docker:
```bash
docker run --env-file .env.docker pcos-app
```

Or use docker-compose with environment variables:
```bash
docker-compose up
```

## Deployment Checklist

- [ ] Set production MONGODB_URI
- [ ] Generate new JWT_SECRET for production
- [ ] Update NEXT_PUBLIC_APP_URL to production domain
- [ ] Configure email service (SMTP)
- [ ] Setup Stripe/Razorpay if using payments
- [ ] Enable Google Analytics
- [ ] Setup monitoring and logging
- [ ] Configure CDN (Cloudflare)
- [ ] Enable HTTPS/SSL

---

Need help? Check the main README.md or create an issue on GitHub.
