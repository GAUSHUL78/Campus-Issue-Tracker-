const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  problemName: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  urgency: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium', required: true },
  description: { type: String, required: true },
  image: { type: String }, // Store filename instead of buffer
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['New', 'Pending', 'Resolved'], default: 'New' },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Problem', problemSchema); 