import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

import Client from '../database';
import validateRequest from '../utilities/validateRequest';

export type users = {
   id: number;
   email: string;
   first_name: string;
   last_name: string;
   password: string;
   token: string;
};

export class UserModels {
   async create(request: Request): Promise<users> {
      validateRequest(request);
      try {
         const hashPassword = bcrypt.hashSync(request.body.password, 10);
         const sqlQuery =
            'INSERT INTO users (email,first_name, last_name, password,token) VALUES($1, $2, $3,$4,null) RETURNING *';
         const DBConnection = await Client.connect();
         const result = await DBConnection.query(sqlQuery, [
            request.body.email.toLocaleLowerCase(),
            request.body.first_name,
            request.body.last_name,
            hashPassword
         ]);
         const user = result.rows[0];
         DBConnection.release();
         return user;
      } catch (error) {
         throw new Error(
            `Couldn't add ${request.body.first_name} ${request.body.last_name} because Error: ${error}`
         );
      }
   }
   async login(request: Request): Promise<users> {
      validateRequest(request);
      try {
         let sqlQuery = 'SELECT * FROM users WHERE email=($1)';
         const DBConnection = await Client.connect();
         const result = await DBConnection.query(sqlQuery, [
            request.body.email.toLocaleLowerCase()
         ]);
         const user = result.rows[0];

         if (!user) {
            throw new Error(`No user with this email = ${request.body.email}`);
         }

         const IsValidPassword = bcrypt.compareSync(
            request.body.password,
            user.password
         );
         if (!IsValidPassword) {
            throw new Error(`invalid password`);
         } else {
            // to add token to router
            user.token = jwt.sign(
               { id: user._id, email: user.email },
               process.env.ACCESS_TOKEN_SECRET as string,
               {
                  expiresIn: 86400 //for 24 hour
               }
            );

            sqlQuery = 'UPDATE users SET token = ($1) WHERE id=($2)';
            await DBConnection.query(sqlQuery, [user.token, user.id]);
         }
         DBConnection.release();
         return user;
      } catch (error) {
         throw new Error(
            `Couldn't add ${request.body.first_name} ${request.body.last_name}} because Error: ${error}`
         );
      }
   }
   async show(request: Request): Promise<users> {
      validateRequest(request);
      try {
         const sqlQuery = 'SELECT * FROM users WHERE id=($1)';
         const DBConnection = await Client.connect();
         const result = await DBConnection.query(sqlQuery, [request.params.id]);
         const user = result.rows[0];
         DBConnection.release();

         if (!user) {
            throw new Error(`No user with this id = ${request.params.id}`);
         }

         return user;
      } catch (error) {
         throw new Error(
            `Couldn't find user with this id = ${request.params.id} because Error: ${error}`
         );
      }
   }
   async index(request: Request): Promise<users[]> {
      validateRequest(request);
      try {
         const sqlQuery = 'SELECT * FROM users';
         const DBConnection = await Client.connect();
         const result = await DBConnection.query(sqlQuery);
         const user = result.rows;

         DBConnection.release();

         if (!user) {
            throw new Error('No users to show');
         }

         return user;
      } catch (error) {
         throw new Error(`Couldn't find users because Error: ${error}`);
      }
   }

   async logout(request: Request): Promise<users> {
      validateRequest(request);
      try {
         const sqlQuery = 'UPDATE users SET token = null WHERE id=($1)';
         const DBConnection = await Client.connect();
         const result = await DBConnection.query(sqlQuery, [request.params.id]);
         const user = result.rows[0];
         DBConnection.release();
         return user;
      } catch (error) {
         throw new Error(
            `Couldn't find user with this id = ${request.params.id} because Error: ${error}`
         );
      }
   }
}
