import express from 'express';
import * as user from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { uploadImageFromLocalToServer } from '../helpers/multer.js';

const router = express.Router();

router.post('/add-to-wishlist', isAuthenticated, user.addWishlist);
router.delete('/remove-from-wishlist', isAuthenticated, user.removeFromWishlist);
router.get('/get-user-wishlist', isAuthenticated, user.getUserWishlist);
router.put('/update-user-profile', isAuthenticated, user.updateProfile);
router.put('/update-user-profile-picture', isAuthenticated, uploadImageFromLocalToServer.single('profile'), user.updateProfilePicture);

export default router;
