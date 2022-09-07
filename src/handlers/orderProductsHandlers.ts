import { Request, Response, NextFunction } from 'express';
import { orderProductsModels } from '../models/orderProductsModels';

const newOrderProduct = new orderProductsModels();
export const create = async (
   request: Request,
   response: Response,
   next: NextFunction
) => {
   await newOrderProduct
      .create(request)
      .then((orderData) => {
         response.json({
            status: 1,
            data: {
               id: orderData.id,
               quantity: orderData.quantity,
               order_id: orderData.order_id,
               product_id: orderData.product_id
            }
         });
      })
      .catch((error) => {
         next(error);
      });
};
export const getAllOrderProducts = async (
   request: Request,
   response: Response,
   next: NextFunction
) => {
   await newOrderProduct
      .getAllOrderProducts(request)
      .then((orderData) => {
         response.json({
            status: 1,
            count: orderData.length,
            data: orderData.map((data) => {
               return {
                  id: data.id,
                  quantity: data.quantity,
                  order_id: data.order_id,
                  product_id: data.product_id
               };
            })
         });
      })
      .catch((error) => {
         next(error);
      });
};
