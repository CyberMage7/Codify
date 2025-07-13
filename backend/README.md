<div align="center">

# 🚀 Codify Backend

### Powerful Node.js API Server with Express & MongoDB

[![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![AWS](https://img.shields.io/badge/AWS-S3-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/s3/)

</div>

---

## ✨ Overview

The **Codify Backend** is a robust, scalable Node.js API server that powers the Codify platform. Built with Express.js and MongoDB, it provides secure authentication, repository management, and comprehensive API endpoints for the frontend application.

## 🎯 Key Features

### 🔐 **Authentication & Security**
- 🔑 **JWT Authentication** - Secure token-based auth system
- 🛡️ **Password Hashing** - bcrypt for secure password storage
- 🚪 **Middleware Protection** - Route-level authentication
- 👥 **User Management** - Complete user lifecycle management

### 📦 **Repository Management**
- 🏗️ **CRUD Operations** - Create, read, update, delete repositories
- 🔒 **Privacy Controls** - Public/private repository settings
- 📊 **Metadata Handling** - Language, description, topics
- 🌟 **Social Features** - Stars, forks, issues tracking

### 🗃️ **Database Integration**
- 🍃 **MongoDB** - NoSQL database for flexible data storage
- 📋 **Mongoose ODM** - Object modeling and validation
- 🔗 **Data Relationships** - User-repository associations
- 📈 **Optimized Queries** - Efficient data retrieval

### ☁️ **Cloud Integration**
- 📁 **AWS S3** - File storage and management
- 🌐 **RESTful API** - Clean, predictable endpoints
- 🔄 **Error Handling** - Comprehensive error management
- 📝 **Logging** - Request and error logging

## 🏗️ Project Structure

```
backend/
├── 📁 config/              # Configuration files
│   └── aws-config.js       # AWS S3 configuration
├── 📁 controllers/         # Route controllers
│   ├── userController.js   # User management
│   ├── repoController.js   # Repository operations
│   ├── issueController.js  # Issue tracking
│   ├── add.js             # Git add operations
│   ├── commit.js          # Git commit operations
│   ├── push.js            # Git push operations
│   ├── pull.js            # Git pull operations
│   ├── revert.js          # Git revert operations
│   └── init.js            # Repository initialization
├── 📁 middleware/          # Express middleware
│   ├── authMiddleware.js   # JWT authentication
│   └── authorizeMiddleware.js # Authorization checks
├── 📁 models/              # MongoDB models
│   ├── userModel.js        # User schema
│   ├── repoModel.js        # Repository schema
│   └── issueModel.js       # Issue schema
├── 📁 routes/              # API routes
│   ├── main.router.js      # Main routes
│   ├── user.router.js      # User routes
│   ├── repo.router.js      # Repository routes
│   └── issue.router.js     # Issue routes
├── index.js                # Server entry point
├── package.json            # Dependencies & scripts
├── commit.json            # Commit tracking
├── hello.txt              # Sample file
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0+
- MongoDB 6.0+
- AWS S3 account (optional)

### Installation & Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Create .env file
   touch .env
   ```

4. **Add environment variables**
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/codify
   
   # Authentication
   JWT_SECRET=your_super_secure_jwt_secret_here
   JWT_EXPIRES_IN=7d
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # AWS S3 (Optional)
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   AWS_BUCKET_NAME=codify-storage
   
   # CORS
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start the server**
   ```bash
   npm start
   ```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | 🚀 Start production server |
| `npm run dev` | 🔄 Start development server with nodemon |
| `npm test` | 🧪 Run test suite |
| `npm run lint` | 🔍 Run ESLint checks |

## 🛣️ API Endpoints

### 🔐 Authentication Routes
```http
POST   /api/auth/register    # User registration
POST   /api/auth/login       # User login
GET    /api/auth/profile     # Get user profile
PUT    /api/auth/profile     # Update user profile
```

### 👥 User Routes
```http
GET    /api/users           # Get all users
GET    /api/users/:id       # Get user by ID
PUT    /api/users/:id       # Update user
DELETE /api/users/:id       # Delete user
```

### 📦 Repository Routes
```http
GET    /api/repositories          # Get user repositories
POST   /api/repositories          # Create new repository
GET    /api/repositories/:id      # Get repository by ID
PUT    /api/repositories/:id      # Update repository
DELETE /api/repositories/:id      # Delete repository
```

### 🐛 Issue Routes
```http
GET    /api/issues               # Get all issues
POST   /api/issues               # Create new issue
GET    /api/issues/:id           # Get issue by ID
PUT    /api/issues/:id           # Update issue
DELETE /api/issues/:id           # Delete issue
```

## 🗃️ Database Models

### 👤 User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  repositories: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### 📦 Repository Model
```javascript
{
  name: String,
  description: String,
  isPrivate: Boolean,
  language: String,
  owner: ObjectId,
  stars: Number,
  forks: Number,
  issues: Number,
  topics: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 🐛 Issue Model
```javascript
{
  title: String,
  description: String,
  status: String,
  priority: String,
  repository: ObjectId,
  author: ObjectId,
  assignee: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Middleware

### 🔐 Authentication Middleware
```javascript
// Protects routes requiring authentication
const authMiddleware = require('./middleware/authMiddleware');
```

### 🛡️ Authorization Middleware
```javascript
// Checks user permissions for specific resources
const authorizeMiddleware = require('./middleware/authorizeMiddleware');
```

## ⚙️ Configuration

### 🌐 CORS Configuration
```javascript
// Allows frontend communication
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### 🗃️ MongoDB Connection
```javascript
// Mongoose connection with error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | 18.0+ |
| **Express.js** | Web Framework | 4.18+ |
| **MongoDB** | Database | 6.0+ |
| **Mongoose** | ODM | Latest |
| **JWT** | Authentication | Latest |
| **bcrypt** | Password Hashing | Latest |
| **AWS SDK** | Cloud Storage | Latest |
| **CORS** | Cross-Origin Requests | Latest |

## 🔒 Security Features

- 🔐 **JWT Token Authentication**
- 🛡️ **Password Hashing with bcrypt**
- 🚪 **Protected Route Middleware**
- 🌐 **CORS Configuration**
- 🔍 **Input Validation**
- 🚨 **Error Handling**

## 📊 Performance Optimizations

- ⚡ **Database Indexing**
- 🔄 **Connection Pooling**
- 📦 **Response Compression**
- 🎯 **Efficient Queries**
- 📈 **Caching Strategies**

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- --grep "User Controller"

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### 🐳 Docker Support
```dockerfile
# Dockerfile included for containerized deployment
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### ☁️ Cloud Deployment
- **Heroku** - Ready for deployment
- **AWS EC2** - Scalable cloud hosting
- **Digital Ocean** - Simple droplet deployment
- **Vercel** - Serverless functions

## 🔮 Future Enhancements

- [ ] GraphQL API implementation
- [ ] Real-time WebSocket connections
- [ ] Redis caching layer
- [ ] Rate limiting and throttling
- [ ] API documentation with Swagger
- [ ] Microservices architecture
- [ ] Advanced logging with Winston
- [ ] Health check endpoints

## 🤝 Contributing

1. Follow RESTful API conventions
2. Write comprehensive tests
3. Document new endpoints
4. Follow security best practices
5. Use proper error handling

## 📄 License

This backend is part of the Codify project and follows the same MIT License.

---

<div align="center">

### 🚀 Powering the Codify platform with robust, secure API services

**Part of the [Codify](../README.md) project**

</div>
