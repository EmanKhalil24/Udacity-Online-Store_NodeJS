import { Request } from 'express';

import Client from '../database';
import validateRequest from '../utilities/validateRequest';

export type product = {
   id: number;
   name: string;
   price: number;
   category_id: number;
};

export class ProductModels {
   async create(request: Request): Promise<product> {
      validateRequest(request);
      try {
         const sqlQuery =
            'INSERT INTO products (name,price, category_id) VALUES($1, $2, $3) RETURNING *';
         const DBConnection = await Client.connect();
         const result = await DBConnection.query(sqlQuery, [
            request.body.name,
            request.body.price,
            request.body.category_id
         ]);
         const product = result.rows[0];
         DBConnection.release();
         return product;
      } catch (error) {
         throw new Error(
            `Couldn't add ${request.body.name} because Error: ${error}`
         );
      }
   }
   async show(request: Request): Promise<product> {
      validateRequest(request);
      try {
         const sqlQuery = 'SELECT * FROM products WHERE id=($1)';
         const DBConnection = await Client.connect();
         const result = await DBConnection.query(sqlQuery, [request.params.id]);
         const product = result.rows[0];
         DBConnection.release();

         if (!product) {
            throw new Error(`No product with this id = ${request.params.id}`);
         }

         return product;
      } catch (error) {
         throw new Error(
            `Couldn't find product with this id = ${request.params.id} because Error: ${error}`
         );
      }
   }
   async index(request: Request): Promise<product[]> {
      validateRequest(request);
      try {
         const sqlQuery = 'SELECT * FROM products';
         const DBConnection = await Client.connect();
         const result = await DBConnection.query(sqlQuery);
         const product = result.rows;

         DBConnection.release();

         if (!product) {
            throw new Error('No products to show');
         }

         return product;
      } catch (error) {
         throw new Error(`Couldn't find products because Error: ${error}`);
      }
   }
}
