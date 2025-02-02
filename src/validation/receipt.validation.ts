import Joi from 'joi';

export const receiptSchema = Joi.object({
  retailer: Joi.string().required(),
  purchaseDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  purchaseTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(),
  items: Joi.array()
    .items(
      Joi.object({
        shortDescription: Joi.string().required(),
        price: Joi.string().pattern(/^\d+\.\d{2}$/).required()
      })
    )
    .min(1)
    .required(),
  total: Joi.string().pattern(/^\d+\.\d{2}$/).required()
});
