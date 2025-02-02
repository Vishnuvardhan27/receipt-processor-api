import { Router } from 'express';
import { submitReceipt, getReceiptPoints } from '../controllers/receipt.controller';
import { validateReceipt } from '../middlewares/validation.middleware';

const router = Router();

/**
 * POST /receipts/process
 */
router.post('/process', validateReceipt, submitReceipt);

/**
 * GET /receipts/:id/points
 */
router.get('/:id/points', getReceiptPoints);

export default router;
