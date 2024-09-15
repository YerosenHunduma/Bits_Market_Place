import express from 'express';
import * as auth from '../controllers/auth.controller.js';
import { registrationValidator } from '../validator/registrationValidator.js';
import { resetPasswordValidator } from '../validator/resetPasswordValidator.js';
import { changePasswordValidator } from '../validator/changePasswordValidator.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registrationValidator, auth.registerUser);
router.post('/login', auth.signin);
router.post('/logout', auth.signOut);
router.post('/forgot-password', auth.forgotPassword);
router.put('/reset-password/:token/:userId', resetPasswordValidator, auth.resetPassword);
router.put('/change-password', changePasswordValidator, isAuthenticated, auth.changePassword);

export default router;
