const { getFirebaseAdmin } = require('../config/firebase');

async function firebaseProtect(req, res, next) {
  const auth = getFirebaseAdmin();
  if (!auth) {
    return res.status(503).json({ success: false, message: 'Firebase Admin authentication is not configured.' });
  }

  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Firebase ID token is required.' });
  }

  try {
    const token = header.slice(7).trim();
    const decoded = await auth.auth().verifyIdToken(token);
    req.firebaseUser = decoded;
    req.user = {
      id: decoded.uid,
      email: decoded.email || '',
      name: decoded.name || decoded.email?.split('@')[0] || 'Student',
      avatar: decoded.picture || null
    };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired Firebase ID token.' });
  }
}

module.exports = { firebaseProtect };
