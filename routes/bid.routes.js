import express from 'express';
import * as bid from '../controllers/bid.controller.js';
import { createBidValidator } from '../validator/bidRequestValidator.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/bid-request', isAuthenticated, createBidValidator, bid.bidRequest);
router.get('/get-bid-request/:productId', isAuthenticated, bid.sellerGetBids);
router.get('/get-bid-history', isAuthenticated, bid.bidderGetBids);

export default router;
