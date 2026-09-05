const User = require('../models/User');

function publicUser(user, firebaseUser) {
  const source = user || {};
  return {
    id: source.firebaseUid || firebaseUser?.uid || source._id?.toString(),
    name: source.name || firebaseUser?.name || 'Student',
    email: source.email || firebaseUser?.email || '',
    avatar: source.avatar || firebaseUser?.avatar || null,
    educationLevel: source.educationLevel,
    institution: source.institution,
    academicField: source.academicField,
    preferredField: source.preferredField,
    fscStream: source.fscStream,
    city: source.city,
    country: source.country,
    marksPercentage: source.marksPercentage,
    favoriteSubjects: source.favoriteSubjects,
    interests: source.interests || [],
    otherInterests: source.otherInterests,
    careerGoals: source.careerGoals || [],
    continueStudies: source.continueStudies,
    aptitudeScore: source.aptitudeScore,
    categoryScores: source.categoryScores || {},
    recommendedCareerId: source.recommendedCareerId,
    streakCount: source.streakCount || 0,
    xpPoints: source.xpPoints || 0,
    studyTimeSeconds: source.studyTimeSeconds || 0,
    isLoggedIn: true,
    createdAt: source.createdAt || new Date().toISOString()
  };
}

exports.me = async (req, res) => {
  try {
    let user = null;
    if (req.app.locals.dbReady) user = await User.findOne({ firebaseUid: req.firebaseUser.uid });
    return res.json({ success: true, user: publicUser(user, req.user) });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not load profile.' });
  }
};

exports.upsertProfile = async (req, res) => {
  if (!req.app.locals.dbReady) {
    return res.json({ success: true, user: publicUser(req.body, req.user), persisted: false });
  }
  try {
    const allowed = [
      'name','avatar','educationLevel','institution','academicField','preferredField','fscStream',
      'city','country','marksPercentage','favoriteSubjects','interests','otherInterests','careerGoals',
      'continueStudies','aptitudeScore','categoryScores','recommendedCareerId','streakCount',
      'xpPoints','studyTimeSeconds'
    ];
    const update = {};
    for (const key of allowed) if (req.body[key] !== undefined) update[key] = req.body[key];

    const user = await User.findOneAndUpdate(
      { firebaseUid: req.firebaseUser.uid },
      { $set: { ...update, email: req.firebaseUser.email || req.body.email, firebaseUid: req.firebaseUser.uid } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json({ success: true, user: publicUser(user, req.user), persisted: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Profile update failed.' });
  }
};
