# 🚀 PCOS Care Connect - Deployment Guide

## Quick Deployment

### Deploy to Vercel (Easiest)

1. **Push to GitHub**
```bash
git remote add origin https://github.com/yourusername/HACKATHON.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variables
   - Deploy!

3. **Set Environment Variables on Vercel**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pcos-care-connect
JWT_SECRET=your-production-secret-32-character-minimum
NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app
NODE_ENV=production
```

---

## Docker Deployment

### Build Docker Image
```bash
docker build -t pcos-care-connect:latest .
```

### Run with Docker Compose
```bash
docker-compose up -d
```

Visit: http://localhost:3000

### Stop Docker
```bash
docker-compose down
```

---

## AWS Deployment (EC2)

### 1. Launch EC2 Instance
- AMI: Ubuntu 22.04 LTS
- Instance type: t3.small (or larger)
- Security group: Allow ports 22, 80, 443

### 2. SSH into Instance
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

### 3. Install Dependencies
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm git
sudo apt install -y mongodb
```

### 4. Clone and Setup
```bash
git clone https://github.com/yourusername/HACKATHON.git
cd HACKATHON/pcos-care-connect
npm install
```

### 5. Create .env.production
```bash
cat > .env.production << EOF
MONGODB_URI=mongodb://localhost:27017/pcos-care-connect
JWT_SECRET=your-production-secret-key
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
EOF
```

### 6. Build and Start
```bash
npm run build
npm start
```

### 7. Setup PM2 for Auto-restart
```bash
sudo npm install -g pm2
pm2 start "npm start" --name "pcos-care"
pm2 startup
pm2 save
```

### 8. Setup Nginx Reverse Proxy
```bash
sudo apt install -y nginx

sudo cat > /etc/nginx/sites-available/pcos << EOF
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/pcos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 9. Setup SSL (Let's Encrypt)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Heroku Deployment (Deprecated but still works)

### 1. Install Heroku CLI
```bash
curl https://cli.heroku.com/install.sh | sh
```

### 2. Login
```bash
heroku login
```

### 3. Create App
```bash
heroku create your-app-name
```

### 4. Add MongoDB
```bash
heroku addons:create mongolab
```

### 5. Set Config Variables
```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set MONGODB_URI=$(heroku config:get MONGODB_URI)
```

### 6. Deploy
```bash
git push heroku main
```

---

## Google Cloud Platform (GCP)

### 1. Create Project
- Go to Google Cloud Console
- Create new project

### 2. Deploy to Cloud Run
```bash
gcloud builds submit --tag gcr.io/YOUR-PROJECT/pcos-care-connect
gcloud run deploy pcos-care-connect \
  --image gcr.io/YOUR-PROJECT/pcos-care-connect \
  --platform managed \
  --region us-central1
```

### 3. Set Environment Variables
```bash
gcloud run services update pcos-care-connect \
  --set-env-vars MONGODB_URI=your-mongodb-uri
```

---

## DigitalOcean App Platform

### 1. Push to GitHub

### 2. Go to DigitalOcean
- Click "Create" → "App"
- Select GitHub repository
- Configure build settings
- Set environment variables

### 3. Deploy
- Click "Deploy"

---

## Performance Optimization

### 1. Enable Image Optimization
```js
// next.config.js
images: {
  formats: ['image/avif', 'image/webp'],
}
```

### 2. Setup CDN
- Use Cloudflare for free CDN
- Set DNS records to Cloudflare

### 3. Database Indexing
```js
// Ensure indexes are created
db.users.createIndex({ email: 1 }, { unique: true })
db.hospitals.createIndex({ state: 1, city: 1 })
db.appointments.createIndex({ patient: 1, appointmentDate: -1 })
```

### 4. Enable Compression
```bash
# Nginx
gzip on;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript;
gzip_min_length 1024;
```

---

## Monitoring & Logging

### Vercel
- Built-in monitoring dashboard
- Real-time logs available

### AWS CloudWatch
```bash
sudo apt install -y awscli
aws configure
```

### PM2 Monitoring
```bash
pm2 install pm2-auto-pull
pm2 web
```

---

## Database Backup

### MongoDB Atlas Backup
- Automatic daily backups (free plan)
- Manual backup on demand

### Local Backup
```bash
mongodump --uri "mongodb://localhost:27017/pcos-care-connect"
```

### Restore Backup
```bash
mongorestore --uri "mongodb://localhost:27017/pcos-care-connect" dump/
```

---

## SSL/TLS Certificate

### Free SSL with Let's Encrypt
```bash
certbot certonly --standalone -d yourdomain.com
```

### Auto-renewal
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## Horizontal Scaling

### Load Balancing (Nginx)
```nginx
upstream backend {
    server app1:3000;
    server app2:3000;
    server app3:3000;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

### Kubernetes (Advanced)
```bash
kubectl create deployment pcos-app --image=gcr.io/your-project/pcos-care-connect
kubectl expose deployment pcos-app --type=LoadBalancer --port=80 --target-port=3000
kubectl scale deployment pcos-app --replicas=3
```

---

## Security Checklist

- [ ] Use HTTPS/SSL
- [ ] Set secure cookies
- [ ] Enable CSRF protection
- [ ] Validate all inputs
- [ ] Use environment variables
- [ ] Keep dependencies updated
- [ ] Enable rate limiting
- [ ] Setup firewall rules
- [ ] Regular security audits
- [ ] Monitor for attacks

---

## Troubleshooting

### Out of Memory
```bash
# Check memory usage
free -h

# Increase Node memory
NODE_OPTIONS=--max-old-space-size=2048 npm start
```

### High CPU Usage
- Check database queries
- Enable caching
- Optimize images
- Use CDN

### Database Connection Issues
```bash
# Check MongoDB connection
telnet mongodb-host 27017

# Verify connection string
echo $MONGODB_URI
```

---

## Success!

Your PCOS Care Connect application is now deployed and accessible worldwide! 🎉

For monitoring and scaling, check your deployment platform's documentation.

---

**Need Help?** Check the main README.md for more information.
