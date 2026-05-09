# API Documentation

This document provides comprehensive documentation for all PCOS Care Connect API endpoints.

## Base URL
```
http://localhost:3000/api (development)
https://api.pcoscare.com (production)
```

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

Token is obtained from login/register endpoints and expires in 7 days.

---

## Authentication Endpoints

### POST /auth/register
Register new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phone": "+919876543210",
  "gender": "female",
  "state": "Maharashtra",
  "city": "Mumbai",
  "role": "patient" // optional, defaults to "patient"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

**Errors:**
- 400: Email already exists
- 400: Missing required fields

---

### POST /auth/login
User login.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

**Errors:**
- 401: Invalid credentials

---

### GET /auth/me
Get current authenticated user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "gender": "female",
  "state": "Maharashtra",
  "city": "Mumbai",
  "role": "patient",
  "isVerified": true
}
```

**Errors:**
- 401: Unauthorized
- 401: Invalid token

---

## Hospital Endpoints

### GET /hospitals
List hospitals with filtering.

**Query Parameters:**
```
state=Maharashtra      // Optional: filter by state
city=Mumbai            // Optional: filter by city
specialty=Gynecology   // Optional: filter by specialty
page=1                 // Optional: page number (default: 1)
limit=10               // Optional: results per page (default: 10)
```

**Response (200):**
```json
{
  "hospitals": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Apollo Hospitals",
      "city": "Mumbai",
      "state": "Maharashtra",
      "rating": 4.8,
      "specialties": ["Gynecology", "Endocrinology"],
      "availableBeds": 45,
      "emergencyServices": true
    }
  ],
  "total": 156,
  "page": 1,
  "pages": 16
}
```

---

### POST /hospitals
Create new hospital (hospital_admin/super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Apollo Hospitals",
  "email": "apollo@hospitals.com",
  "phone": "+911140696000",
  "address": "Navi Mumbai",
  "city": "Mumbai",
  "state": "Maharashtra",
  "registrationNumber": "REG12345",
  "specialties": ["Gynecology", "Endocrinology"],
  "totalBeds": 150,
  "emergencyServices": true
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Apollo Hospitals",
  "city": "Mumbai",
  "state": "Maharashtra"
}
```

---

### GET /hospitals/[id]
Get hospital details with doctors.

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Apollo Hospitals",
  "city": "Mumbai",
  "state": "Maharashtra",
  "address": "Navi Mumbai",
  "rating": 4.8,
  "specialties": ["Gynecology", "Endocrinology"],
  "doctors": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "name": "Dr. Sharma",
      "specialization": "Gynecology",
      "experience": 15
    }
  ]
}
```

---

## Doctor Endpoints

### GET /doctors
List doctors with filtering.

**Query Parameters:**
```
specialization=Gynecology  // Optional: filter by specialization
city=Mumbai                // Optional: filter by city
page=1                     // Optional: page number
limit=10                   // Optional: results per page
```

**Response (200):**
```json
{
  "doctors": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "name": "Dr. Sharma",
      "specialization": "Gynecology",
      "experience": 15,
      "hospital": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Apollo Hospitals"
      }
    }
  ],
  "total": 245,
  "page": 1,
  "pages": 25
}
```

---

### GET /doctors/[id]
Get doctor profile.

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "name": "Dr. Sharma",
  "specialization": "Gynecology",
  "qualification": "MD, DNBE",
  "experience": 15,
  "licenseNumber": "MED123456",
  "consultationFee": 500,
  "hospital": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Apollo Hospitals",
    "city": "Mumbai"
  }
}
```

---

## Appointment Endpoints

### GET /appointments
Get appointments (filtered by role).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
status=scheduled          // Optional: filter by status
page=1                    // Optional: page number
limit=10                  // Optional: results per page
```

**Response (200):**
```json
{
  "appointments": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "appointmentDate": "2024-02-15",
      "startTime": "14:00",
      "status": "scheduled",
      "doctor": {
        "name": "Dr. Sharma",
        "specialization": "Gynecology"
      },
      "hospital": {
        "name": "Apollo Hospitals"
      },
      "consultationFee": 500
    }
  ],
  "total": 5,
  "page": 1,
  "pages": 1
}
```

---

### POST /appointments
Book new appointment (patient only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "doctorId": "507f1f77bcf86cd799439020",
  "hospitalId": "507f1f77bcf86cd799439011",
  "appointmentDate": "2024-02-15",
  "startTime": "14:00",
  "endTime": "15:00",
  "consultationType": "in-person",
  "reason": "Regular checkup",
  "symptoms": ["Irregular Periods", "Weight Gain"]
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439030",
  "appointmentDate": "2024-02-15",
  "startTime": "14:00",
  "status": "scheduled",
  "paymentStatus": "pending"
}
```

---

### PATCH /appointments/[id]
Update appointment (doctor/hospital_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "completed",
  "prescription": "Take medication X twice daily",
  "diagnosis": "PCOS confirmed",
  "notes": "Patient showing improvement"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439030",
  "status": "completed",
  "prescription": "Take medication X twice daily"
}
```

---

### DELETE /appointments/[id]
Cancel appointment (patient/doctor only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Appointment cancelled successfully",
  "status": "cancelled"
}
```

---

## Health Tracker Endpoints

### GET /tracker
Get health tracking entries (patient only).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
startDate=2024-01-01      // Optional: filter from date
endDate=2024-02-01        // Optional: filter to date
page=1                    // Optional: page number
limit=30                  // Optional: results per page
```

**Response (200):**
```json
{
  "entries": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "date": "2024-02-15",
      "symptoms": ["Fatigue", "Bloating"],
      "mood": "good",
      "weight": 65,
      "sleepHours": 7,
      "waterIntake": 2.5
    }
  ],
  "total": 15,
  "page": 1,
  "pages": 1
}
```

---

### POST /tracker
Create health tracking entry (patient only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "date": "2024-02-15",
  "symptoms": ["Fatigue", "Bloating"],
  "mood": "good",
  "weight": 65,
  "bloodPressure": "120/80",
  "sleepHours": 7,
  "waterIntake": 2.5,
  "exercise": "moderate",
  "exerciseDuration": 30,
  "painLevel": 3,
  "notes": "Feeling better today"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439040",
  "date": "2024-02-15",
  "patient": "507f1f77bcf86cd799439012"
}
```

---

## Community Endpoints

### GET /community
Get community posts with filtering.

**Query Parameters:**
```
category=symptoms         // Optional: filter by category
tag=diet                  // Optional: filter by tag
search=diet              // Optional: search in title/content
page=1                   // Optional: page number
limit=20                 // Optional: results per page
```

**Response (200):**
```json
{
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439050",
      "title": "Best diet for PCOS",
      "content": "I've been following...",
      "category": "diet",
      "postType": "tip",
      "likes": 45,
      "views": 234,
      "author": {
        "name": "Sarah Johnson",
        "role": "patient"
      },
      "createdAt": "2024-02-15T10:30:00Z"
    }
  ],
  "total": 156,
  "page": 1,
  "pages": 8
}
```

---

### POST /community
Create community post (authenticated users).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Best diet for PCOS",
  "content": "I've been following a low GI diet...",
  "category": "diet",
  "postType": "tip",
  "tags": ["diet", "nutrition", "pcos"],
  "isAnonymous": false
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439050",
  "title": "Best diet for PCOS",
  "author": "507f1f77bcf86cd799439012"
}
```

---

### POST /community/[id]/like
Like/unlike post.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "action": "like" // or "unlike"
}
```

**Response (200):**
```json
{
  "likes": 46,
  "liked": true
}
```

---

## Status Codes

- **200 OK** - Successful request
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid input
- **401 Unauthorized** - Missing/invalid authentication
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## Error Response Format

```json
{
  "error": "Description of error",
  "code": "ERROR_CODE" // optional
}
```

---

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

Header returned: `X-RateLimit-Remaining`

---

## Pagination

All list endpoints support pagination:

**Query Parameters:**
```
page=1     // Page number (1-indexed)
limit=10   // Items per page (max: 100)
```

**Response includes:**
```json
{
  "data": [...],
  "total": 156,      // Total items
  "page": 1,         // Current page
  "pages": 16,       // Total pages
  "limit": 10        // Items per page
}
```

---

## Date Format

All dates should be in ISO 8601 format:
```
2024-02-15          (date only)
2024-02-15T10:30:00Z (datetime)
```

---

## Testing Endpoints

Use Postman, Insomnia, or curl:

```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'

# Get profile (requires token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/auth/me
```

---

## Support

For API issues or questions, contact:
- Email: api-support@pcoscare.com
- Documentation: https://docs.pcoscare.com
- Issues: https://github.com/aarambharun-coder/HACKATHON/issues
