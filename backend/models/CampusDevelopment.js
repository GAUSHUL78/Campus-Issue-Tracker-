const mongoose = require('mongoose');

const campusDevelopmentSchema = new mongoose.Schema({
  developmentName: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  completionDate: { type: Date },
  status: { type: String, enum: ['Planned', 'Under Construction', 'Completed'], default: 'Planned' },
  imageUrl: { type: String },
});

module.exports = mongoose.model('CampusDevelopment', campusDevelopmentSchema); 