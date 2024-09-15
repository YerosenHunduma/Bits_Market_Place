import express from 'express';
import * as payment from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/pay', payment.paymentService);
router.post('/verify', payment.verify);
router.post('/webhook', payment.webhook);
router.get('/get-transactios', payment.getTransactions);

export default router;
