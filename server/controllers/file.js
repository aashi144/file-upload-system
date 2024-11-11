const File = require('../models/file');

// Function to upload file
async function UploadFile(req, res) {
  try {
      console.log("running here");
      
    const newFile = new File({
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      size: req.file.size,
    });
    await newFile.save();
    console.log("uploaded");
    
    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

// Function to get list of all files
async function getFiles(req, res) {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

// Function to download a file by ID
async function downloadFile(req, res) {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.download(file.filePath, file.originalName);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  UploadFile,
  getFiles,
  downloadFile,
};
