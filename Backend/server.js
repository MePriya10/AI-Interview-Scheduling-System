const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/schedulai';

//Middleware FIRST — apply to all routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Then define your routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const schedulerRoutes = require('./routes/schedulerRoutes');
app.use('/api/scheduler', schedulerRoutes);

// Optional test route
app.post('/check', (req, res) => {
  console.log('reached in backend');
  res.send('working');
});

// Connect to DB and then start server
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB Connected');
    console.log('Connected to DB:', mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
