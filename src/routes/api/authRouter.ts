import { Router } from 'express';
import { body, param } from 'express-validator';

import {
   login,
   create,
   show,
   index,
   logout
} from '../../handlers/authHandlers';
import checkTokens from '../../utilities/checkTokens';

const auth: Router = Router();

auth.post('/login', checkEmailAndPassword(), login);
auth.post('/create', checkEmailAndPassword(), checkUserName(), create);
auth.get('/Index', checkTokens, index);
auth.get('/show/:id', checkTokens, checkID(), show);
auth.post('/logout/:id', checkTokens, checkID(), logout);

function checkID() {
   return [
      param('id')
         .exists()
         .withMessage('you must enter user id')
         .isInt()
         .withMessage('invalid user id')
   ];
}

function checkEmailAndPassword() {
   return [
      body('email')
         .exists()
         .withMessage('you must enter email')
         .isEmail()
         .withMessage('invalid email'),
      body('password')
         .exists()
         .withMessage('you must enter password')
         .isStrongPassword()
         .withMessage(
            'Password Must contain at least 1 characters(upper and lower),numbers,special characters'
         )
   ];
}

function checkUserName() {
   return [
      body('first_name')
         .exists()
         .withMessage('you must enter first_name')
         .isString()
         .withMessage('invalid first_name'),
      body('last_name')
         .exists()
         .withMessage('you must enter last_name')
         .isString()
         .withMessage('invalid last_name')
   ];
}

export default auth;
