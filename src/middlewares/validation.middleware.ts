import { NextFunction, Request, Response } from 'express';
import { receiptSchema } from '../validation/receipt.validation';

export function validateReceipt(req: Request, res: Response, next: NextFunction) {
  const { error } = receiptSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Invalid receipt format',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
}
