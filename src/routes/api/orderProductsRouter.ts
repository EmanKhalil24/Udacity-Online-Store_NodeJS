import { Router } from 'express';
import { body, param } from 'express-validator';

import {
   create,
   getAllOrderProducts
} from '../../handlers/orderProductsHandlers';
import checkTokens from '../../utilities/checkTokens';

const order: Router = Router();

order.post('/create', checkProductData(), create);
order.get('/show/:order_id', checkTokens, checkID(), getAllOrderProducts);

function checkID() {
   return [
      param('order_id')
         .exists()
         .withMessage('you must enter order_id id')
         .isInt()
         .withMessage('invalid order id')
   ];
}

function checkProductData() {
   return [
      body('quantity')
         .exists()
         .withMessage('you must enter quantity')
         .isInt()
         .withMessage('invalid quantity'),

      body('product_id')
         .exists()
         .withMessage('you must enter product_id')
         .isInt()
         .withMessage('invalid product_id'),

      body('order_id')
         .exists()
         .withMessage('you must enter order_id')
         .isInt()
         .withMessage('invalid order_id')
   ];
}

export default order;
