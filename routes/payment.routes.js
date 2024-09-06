import express from 'express';
import * as payment from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/payment', payment.paymentService);
