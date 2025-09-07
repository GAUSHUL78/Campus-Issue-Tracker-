const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const auth = require('../utils/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

// Create a new problem report (Student)
router.post('/', auth(['student']), upload.single('image'), async (req, res) => {
  try {
    console.log('REQ BODY:', req.body);
    console.log('REQ FILE:', req.file);
    console.log('USER:', req.user);

    const { problemName, department, location, urgency, description } = req.body;

    // Validate required fields
    if (!problemName || !department || !location || !urgency || !description) {
      return res.status(400).json({
        message: 'All fields are required',
        missing: {
          problemName: !problemName,
          department: !department,
          location: !location,
          urgency: !urgency,
          description: !description
        }
      });
    }

    // Store the filename if image was uploaded
    const imageFilename = req.file ? req.file.filename : undefined;

    const problem = new Problem({
      problemName,
      department,
      location,
      urgency,
      description,
      image: imageFilename,
      submittedBy: req.user.userId,
    });
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    console.error('ERROR in POST /api/problems:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all problems (Admin)
router.get('/', auth(['admin']), async (req, res) => {
  try {
    const { department, location, status, urgency } = req.query;

    // Build filter object
    const filter = {};
    if (department) filter.department = department;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (status) filter.status = status;
    if (urgency) filter.urgency = urgency;

    console.log('Admin filter:', filter);

    const problems = await Problem.find(filter)
      .populate('submittedBy', 'name email regNo')
      .sort({ submittedAt: -1 }); // Most recent first

    res.json(problems);
  } catch (err) {
    console.error('Error fetching problems:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get problems submitted by current user (Student)
router.get('/my', auth(['student']), async (req, res) => {
  try {
    console.log('Fetching problems for user:', req.user.userId);
    const problems = await Problem.find({ submittedBy: req.user.userId });
    console.log('Found problems:', problems);
    res.json(problems);
  } catch (err) {
    console.error('Error fetching problems:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get unique locations and departments for filtering (Admin)
router.get('/filters', auth(['admin']), async (req, res) => {
  try {
    const locations = await Problem.distinct('location');
    const departments = await Problem.distinct('department');

    res.json({
      locations: locations.filter(loc => loc).sort(),
      departments: departments.filter(dept => dept).sort()
    });
  } catch (err) {
    console.error('Error fetching filters:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update problem status (Admin)
router.put('/:id/status', auth(['admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete problem (Student can delete their own problems, Admin can delete any)
router.delete('/:id', auth(['student', 'admin']), async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Check if user is authorized to delete this problem
    if (req.user.role === 'student' && problem.submittedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own problems' });
    }

    // Delete the problem
    await Problem.findByIdAndDelete(req.params.id);

    res.json({ message: 'Problem deleted successfully' });
  } catch (err) {
    console.error('Error deleting problem:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 