const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const router = express.Router();

// configure AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-south-1' 
});

// configure AWS S3 bucket
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'mern-file-handling', 
    acl: 'public-read', 
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});


router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' });
  }

  const fileUrl = req.file.location;

  res.json({ success: true, message: 'File uploaded successfully', url: fileUrl });
});

module.exports = router;
