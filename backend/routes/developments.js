const express = require('express');
const router = express.Router();
const CampusDevelopment = require('../models/CampusDevelopment');
const auth = require('../utils/authMiddleware');

// Create new development (Admin)
router.post('/', auth(['admin']), async (req, res) => {
  try {
    const { developmentName, description, startDate, completionDate, status, imageUrl } = req.body;
    const development = new CampusDevelopment({
      developmentName,
      description,
      startDate,
      completionDate,
      status,
      imageUrl,
    });
    await development.save();
    res.status(201).json(development);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all developments (All)
router.get('/', auth(['student', 'admin']), async (req, res) => {
  try {
    const developments = await CampusDevelopment.find();
    res.json(developments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update development (Admin)
router.put('/:id', auth(['admin']), async (req, res) => {
  try {
    const update = req.body;
    const development = await CampusDevelopment.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!development) return res.status(404).json({ message: 'Development not found' });
    res.json(development);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 