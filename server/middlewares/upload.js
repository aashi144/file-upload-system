const multer = require('multer');
const path = require('path');

// Configure multer for file uploads with file type restrictions
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain', 'application/json'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, PDF, TXT, and JSON files are allowed.'), false); // Reject the file
  }
};

// Configure upload with storage and fileFilter
const upload = multer({
  storage,
  fileFilter,
});

module.exports = {
  upload,
};
