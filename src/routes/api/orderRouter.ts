import { Router } from 'express';
import { body, param } from 'express-validator';

import { create, getAllUserOrder } from '../../handlers/ordersHandlers';
import checkTokens from '../../utilities/checkTokens';

const order: Router = Router();

order.post('/create', checkProductData(), create);
order.get('/show/:user_id', checkTokens, checkID(), getAllUserOrder);

function checkID() {
   return [
      param('user_id')
         .exists()
         .withMessage('you must enter user id')
         .isInt()
         .withMessage('invalid user id')
   ];
}

function checkProductData() {
   return [
      body('status')
         .exists()
         .withMessage('you must enter name')
         .isIn(['active', 'complete'])
         .withMessage('priority must be in active or complete'),

      body('user_id')
         .exists()
         .withMessage('you must enter user_id')
         .isInt()
         .withMessage('invalid user_id')
   ];
}

export default order;
