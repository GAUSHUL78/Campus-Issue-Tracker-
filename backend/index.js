const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Put the exact origin of your frontend here (no trailing slash!)
const FRONTEND_URL = 'https://campus-issue-tracker-q28h.vercel.app';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS configured for credentials
app.use(cors({
  origin: FRONTEND_URL,           // must be exact origin
  credentials: true,              // allow cookies
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// ✅ Serve uploaded files with the same CORS settings
app.use('/uploads', cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}), express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sliet-civic', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/problems', require('./routes/problems'));
app.use('/api/developments', require('./routes/developments'));

app.get('/', (req, res) => {
  res.send('SLIET Civic Sense API Running');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
