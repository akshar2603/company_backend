import express from 'express';
import { upload, submitCareerApplication, downloadResume } from '../controllers/careerController.js';

const router = express.Router();

// POST route for submitting career application
router.post('/career', upload.single('resume'), submitCareerApplication);

// GET route for downloading resumes
router.get('/career/download/:publicId', downloadResume);

export default router;
