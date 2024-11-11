const express = require('express');
const { UploadFile, getFiles, downloadFile } = require('../controllers/file');
const { upload } = require("../middlewares/upload");
const router = express.Router();

// API to upload file
router.post('/upload', upload.single('file'), UploadFile);

// API to get list of files
router.get('/files', getFiles);

// API to download a file
router.get('/download/:id', downloadFile);

module.exports = router;
