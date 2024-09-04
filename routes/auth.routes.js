import express from 'express';
import * as auth from '../controllers/auth.controller.js';
import { registrationValidator } from '../validator/registrationValidator.js';

const router = express.Router();

router.post('/register', registrationValidator, auth.registerUser);
router.post('/login', registrationValidator, auth.signin);

export default router;
