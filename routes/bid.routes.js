import express from 'express';
import * as bid from '../controllers/bid.controller.js';
import { createBidValidator } from '../validator/bidRequestValidator.js';

const router = express.Router();

router.post('/bid-request', createBidValidator, bid.bidRequest);
router.get('/get-bid-request/:productId', bid.sellerGetBids);
router.get('/get-bid-history', bid.bidderGetBids);
router.put('/reject-bid/:bidId', bid.sellerRejectAction);
router.put('/accept-bid/:bidId', bid.sellerAcceptAction);
export default router;
