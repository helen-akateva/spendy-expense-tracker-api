import { Joi, Segments } from 'celebrate';

export const summaryPeriodValidator = {
  [Segments.PARAMS]: Joi.object({
    period: Joi.string()
      .pattern(/^\d{4}-(0[1-9]|1[0-2])$/)
      .required()
      .messages({
        'string.pattern.base':
          'Період має бути у форматі YYYY-MM і місяць має бути від 01 до 12',
      }),
  }),
};
