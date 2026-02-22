# Saree Rental Marketplace

A modern full-stack web application for renting sarees, built with React.js (Vite) frontend and Node.js/Express backend.

## Features

### User Roles
- **Buyers**: Browse, filter, and rent sarees
- **Sellers**: List sarees for rent, manage bookings
- **Admins**: Manage users, approve sellers, handle disputes

### Core Functionality
- User authentication (JWT)
- Saree browsing with advanced filters
- Booking system with date selection
- Dashboard for each user role
- Responsive design
- Real-time notifications

## Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Tailwind CSS
- Axios for API calls
- React DatePicker
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Express Validator

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saree-rental-marketplace
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Environment Variables**
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/saree-rental
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

2. **MongoDB Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in `.env` if needed

### Database Seeding

Populate the database with sample data:
```bash
cd server
npm run seed
```

**Sample Accounts:**
- **Admin**: admin@example.com / admin123
- **Seller**: seller1@example.com / seller123
- **Seller**: seller2@example.com / seller123

### Running the Application

1. **Start the Backend**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the Frontend**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on http://localhost:3000

### Build for Production

1. **Build Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start Backend in Production**
   ```bash
   cd server
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Sarees
- `GET /api/sarees` - Get all sarees (with filters)
- `GET /api/sarees/:id` - Get single saree
- `POST /api/sarees` - Create saree (seller only)
- `PUT /api/sarees/:id` - Update saree (seller only)
- `DELETE /api/sarees/:id` - Delete saree (seller/admin)

### Bookings
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/status` - Update booking status

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:id/approve` - Approve seller
- `DELETE /api/admin/sarees/:id` - Remove listing

## Project Structure

```
saree-rental-marketplace/
├── client/                    # Frontend React app
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/          # React context (Auth)
│   │   ├── pages/            # Page components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── server/                    # Backend Express app
    ├── controllers/          # (Future use)
    ├── models/               # MongoDB models
    ├── routes/               # API routes
    ├── middleware/           # Custom middleware
    ├── scripts/              # Database seed scripts
    ├── config/               # Database configuration
    ├── app.js                # Express app setup
    ├── server.js             # Server entry point
    ├── .env                  # Environment variables
    └── package.json
```

## Features Overview

### For Buyers
- Browse sarees with filters (price, color, occasion, availability)
- View detailed saree information
- Book sarees with date selection
- View booking history
- Responsive design for mobile/desktop

### For Sellers
- Register and get approved by admin
- Add sarees with images and details
- Set rental prices and availability
- Manage bookings (confirm/cancel)
- View earnings and statistics

### For Admins
- Manage all users and listings
- Approve seller registrations
- Handle booking disputes
- Remove inappropriate listings
- View system statistics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
