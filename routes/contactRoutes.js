import express from 'express';
import { sendEmail }from '../controllers/contactController.js';

const router = express.Router();

router.post('/contact', sendEmail);


export default router;
