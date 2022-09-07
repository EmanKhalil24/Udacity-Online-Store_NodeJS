import { validationResult } from 'express-validator';

export default function validateRequest(request: any) {
   const errors = validationResult(request);
   if (!errors.isEmpty()) {
      const error = new Error();
      error.message = errors
         .array()
         .reduce(
            (current: any, object: { msg: any }) =>
               current + object.msg + '   |   ',
            ''
         );
      throw error;
   }
}
