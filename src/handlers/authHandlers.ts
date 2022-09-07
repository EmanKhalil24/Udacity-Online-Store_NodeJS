import { Request, Response, NextFunction } from 'express';
import { UserModels } from '../models/userModels';

const newUser = new UserModels();

export const create = async (
   request: Request,
   response: Response,
   next: NextFunction
) => {
   await newUser
      .create(request)
      .then((userData) => {
         response.json({
            status: 1,
            data: {
               id: userData.id,
               email: userData.email,
               first_name: userData.first_name,
               last_name: userData.last_name
            }
         });
      })
      .catch((error) => {
         next(error);
      });
};
export const login = async (
   request: Request,
   response: Response,
   next: NextFunction
) => {
   await newUser
      .login(request)
      .then((userData) => {
         response.json({
            status: 1,
            token: userData.token,
            data: {
               id: userData.id,
               email: userData.email,
               first_name: userData.first_name,
               last_name: userData.last_name
            }
         });
      })
      .catch((error) => {
         next(error);
      });
};

export const show = async (
   request: Request,
   response: Response,
   next: NextFunction
) => {
   await newUser
      .show(request)
      .then((userData) => {
         response.json({
            status: 1,
            token: userData.token,
            data: {
               id: userData.id,
               email: userData.email,
               first_name: userData.first_name,
               last_name: userData.last_name
            }
         });
      })
      .catch((error) => {
         next(error);
      });
};

export const index = async (
   request: Request,
   response: Response,
   next: NextFunction
) => {
   await newUser
      .index(request)
      .then((userData) => {
         response.json({
            status: 1,
            count: userData.length,
            data: userData.map((data) => {
               return {
                  id: data.id,
                  token: data.token,
                  email: data.email,
                  first_name: data.first_name,
                  last_name: data.last_name
               };
            })
         });
      })
      .catch((error) => {
         next(error);
      });
};

export const logout = async (
   request: Request,
   response: Response,
   next: NextFunction
) => {
   await newUser
      .logout(request)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_) => {
         response.json({
            status: 1,
            data: 'logout successful'
         });
      })
      .catch((error) => {
         next(error);
      });
};
