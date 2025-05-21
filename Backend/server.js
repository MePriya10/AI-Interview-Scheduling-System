const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/scheduler")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB error", err));

app.use("/api", require("./routes/schedule"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
