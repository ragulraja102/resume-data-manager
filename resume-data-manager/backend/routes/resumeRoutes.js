const express = require('express');
const router = express.Router();
const { getResumes, createResume, getResumeById, deleteResume, updateResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getResumes).post(protect, createResume);
router.route('/:id').get(protect, getResumeById).delete(protect, deleteResume).put(protect, updateResume);

module.exports = router;
