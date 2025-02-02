import { Request, Response } from 'express';
import { IReceipt } from '../interfaces/receipt.interface';
import { processReceipt, getPointsForReceipt } from '../services/receipt.service';

/**
 * POST /receipts/process
 */
export function submitReceipt(req: Request, res: Response) {
  try {
    const receiptData = req.body as IReceipt;
    const id = processReceipt(receiptData);

    return res.status(200).json({ id });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * GET /receipts/:id/points
 */
export function getReceiptPoints(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const points = getPointsForReceipt(id);

    if (points === undefined) {
      return res.status(404).json({ message: 'No receipt found for that ID.' });
    }

    return res.status(200).json({ points });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
