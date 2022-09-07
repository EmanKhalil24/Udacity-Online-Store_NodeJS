import { Router } from 'express';
import { body, param } from 'express-validator';

import { create, show, index } from '../../handlers/productHandlers';
import checkTokens from '../../utilities/checkTokens';

const product: Router = Router();

product.post('/create', checkProductData(), create);
product.get('/Index', checkTokens, index);
product.get('/show/:id', checkTokens, checkID(), show);

function checkID() {
   return [
      param('id')
         .exists()
         .withMessage('you must enter product id')
         .isInt()
         .withMessage('invalid product id')
   ];
}

function checkProductData() {
   return [
      body('name')
         .exists()
         .withMessage('you must enter name')
         .isAlpha()
         .withMessage('invalid name'),

      body('price')
         .exists()
         .withMessage('you must enter price')
         .isInt()
         .withMessage('invalid price'),

      body('category_id')
         .exists()
         .withMessage('you must enter category_id')
         .isInt()
         .withMessage('invalid category_id')
   ];
}

export default product;
