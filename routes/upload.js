const express = require('express');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/upload', upload.single('file'),
  async (req, res) => {
    if (req.file) res.status(200).json({ message: 'Saved' });
    if (!req.file)res.status(404).json({ message: 'Not found' });
  });

module.exports = router;
