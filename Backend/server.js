const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const scheduleRoutes = require('./routes/scheduleRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', scheduleRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
