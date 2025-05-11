const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));


// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scheduleai';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); // exit process if DB fails to connect
});




app.post('/check',(req,res)=>{
  console.log('reached in backend');
})

// Routes
//app.use('/api/auth', authRoutes); // POST /api/auth/register or /api/auth/login


