function analyze(project = {}, submission = {}) {
  const notes = String(submission.notes || '').toLowerCase();
  const category = project.category || 'Computer Science';
  const stage = project.stage || project.difficulty || 'Intermediate';

  let score = 72;
  if (notes.includes('test')) score += 6;
  if (notes.includes('api')) score += 5;
  if (notes.includes('responsive')) score += 4;
  if (notes.includes('security')) score += 4;
  if (notes.includes('documentation') || notes.includes('readme')) score += 3;
  score = Math.min(98, score);

  return {
    score,
    marketFitScore: Math.max(0, score - 2),
    marketReview: `Portfolio review for the ${category} ${stage} project based on submitted links and notes. Stronger evidence of testing, accessibility, security, performance, documentation and measurable user impact improves industry readiness.`,
    strengths: [
      'GitHub repository evidence is present.',
      'A live deployment URL is present.',
      `The project is aligned with the ${category} category and ${stage} level.`
    ],
    weaknesses: [
      'Add automated tests and CI checks.',
      'Document architecture, trade-offs and setup clearly.',
      'Show measurable user impact, accessibility, security and performance considerations.'
    ],
    mistakes: [
      'Review validation, edge cases and production error states before calling the project production-ready.'
    ],
    suggestions: [
      'Add an architecture diagram and demo screenshots to the README.',
      'Add GitHub Actions for lint/test/build validation.',
      'Describe the real user problem and measurable outcome.'
    ],
    nextSteps: [
      'Address the weaknesses and resubmit for another review.',
      'Keep the GitHub and live links current.'
    ],
    reviewedAt: new Date().toISOString()
  };
}

exports.analyze = async (req, res) => {
  try {
    const { project = {}, submission = {} } = req.body || {};
    if (!submission.githubUrl || !/^https?:\/\/(www\.)?github\.com\//i.test(submission.githubUrl)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid GitHub repository URL.' });
    }
    if (!submission.liveUrl || !/^https?:\/\//i.test(submission.liveUrl)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid live deployment URL.' });
    }
    return res.json({ success: true, feedback: analyze(project, submission) });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Project analysis failed.' });
  }
};
