const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^@\s]+@sliet\.ac\.in$/, 'Email must be a sliet.ac.in address']
  },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['student', 'admin'], default: 'student' }
});

module.exports = mongoose.model('User', userSchema); 