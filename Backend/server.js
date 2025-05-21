const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/interviewers', require('./routes/interviewerRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));

const interviewSetupRoutes = require('./routes/interviewSetupRoutes');  // corrected file name
app.use('/api', interviewSetupRoutes);

const scheduleRoutes = require('./routes/schedule');
console.log('scheduleRoutes:', scheduleRoutes);
app.use('/api', scheduleRoutes);

// Test route to check backend is working
app.post('/check', (req, res) => {
  console.log('Reached backend /check endpoint');
  res.send('Backend working');
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scheduleai';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});
