import express from 'express';
import * as contact from '../controllers/contactUs.controller.js';

const router = express.Router();

router.post('contact', contact.contactUs);
