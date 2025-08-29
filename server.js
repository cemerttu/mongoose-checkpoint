// server.js
require('dotenv').config();
const mongoose = require('mongoose');

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error(err));
