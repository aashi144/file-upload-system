const express = require('express');
const connectDB = require('./db/connect');
const fileRoutes = require('./routes/fileRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors({
      origin: 'http://localhost:3000'
  }));
connectDB();

app.use(express.json());

// Static folder for file downloads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File routes
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
