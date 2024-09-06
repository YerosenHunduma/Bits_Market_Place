import express from 'express';
import * as auth from '../controllers/auth.controller.js';
import { registrationValidator } from '../validator/registrationValidator.js';

const router = express.Router();

router.post('/register', registrationValidator, auth.registerUser);
router.post('/login', auth.signin);
router.post('/logout', auth.signOut);

export default router;
