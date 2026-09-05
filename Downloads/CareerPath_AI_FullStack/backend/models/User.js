const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, unique: true, sparse: true, index: true },
  name: { type: String, trim: true, maxlength: 80, default: 'Student' },
  email: { type: String, lowercase: true, trim: true, maxlength: 254 },
  avatar: { type: String, default: null },
  educationLevel: String,
  institution: String,
  academicField: String,
  preferredField: String,
  fscStream: String,
  city: String,
  country: String,
  marksPercentage: Number,
  favoriteSubjects: String,
  interests: { type: [String], default: [] },
  otherInterests: String,
  careerGoals: { type: [String], default: [] },
  continueStudies: String,
  aptitudeScore: Number,
  categoryScores: { type: Map, of: Number, default: {} },
  recommendedCareerId: String,
  streakCount: { type: Number, default: 0 },
  xpPoints: { type: Number, default: 0 },
  studyTimeSeconds: { type: Number, default: 0 }
}, { timestamps: true, strict: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
