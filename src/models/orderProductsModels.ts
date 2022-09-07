import { Request } from 'express';

import Client from '../database';
import validateRequest from '../utilities/validateRequest';

export type orderProducts = {
   id: number;
   quantity: number;
   product_id: number;
   order_id: number;
};

export class orderProductsModels {
   async create(request: Request): Promise<orderProducts> {
      validateRequest(request);
      try {
         const sqlQuery =
            'INSERT INTO order_products (quantity,product_id,order_id) VALUES($1, $2, $3) RETURNING *';
         const DBConnection = await Client.connect();
         const result = await DBConnection.query(sqlQuery, [
            request.body.quantity,
            request.body.product_id,
            request.body.order_id
         ]);
         const order = result.rows[0];
         DBConnection.release();
         return order;
      } catch (error) {
         throw new Error(`Couldn't add order because Error: ${error}`);
      }
   }
   async getAllOrderProducts(request: Request): Promise<orderProducts[]> {
      validateRequest(request);
      try {
         const sqlQuery = 'SELECT * FROM order_products where order_id = ($1)';
         const DBConnection = await Client.connect();
         const result = await DBConnection.query(sqlQuery, [
            request.params.order_id
         ]);
         const products = result.rows;
         DBConnection.release();

         if (!products) {
            throw new Error(
               `No products to show for order = ${request.params.order_id}`
            );
         }

         return products;
      } catch (error) {
         throw new Error(
            `Couldn't find products show for order = ${request.params.user_id} because Error: ${error}`
         );
      }
   }
}
