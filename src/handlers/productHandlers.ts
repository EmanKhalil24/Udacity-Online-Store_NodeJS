import { Request, Response, NextFunction } from 'express';
import { ProductModels } from '../models/productModels'


const newProduct = new ProductModels()
// #=======================================================================================#
// #			                              create                                       #
// #=======================================================================================#
export const create = async (request: Request, response: Response, next: NextFunction) => {
    await newProduct.create(request)
        .then(productData => {
            response.json({
                status: 1,
                data: {
                    id: productData.id,
                    name: productData.name,
                    price: productData.price,
                    category_id: productData.category_id,
                }
            })
        }).catch(error => {
            next(error)
        })
}
// #=======================================================================================#
// #			                       get product by id                                   #
// #=======================================================================================#
export const show = async (request: Request, response: Response, next: NextFunction) => {
    await newProduct.show(request)
        .then(productData => {
            response.json({
                status: 1,
                data: {
                    id: productData.id,
                    name: productData.name,
                    price: productData.price + " $",
                    category_id: productData.category_id,
                }
            })
        }).catch(error => {
            next(error)
        })
}

// #=======================================================================================#
// #			                       get all products                                    #
// #=======================================================================================#
export const index = async (request: Request, response: Response, next: NextFunction) => {
    await newProduct.index(request)
        .then(productData => {
            response.json({
                status: 1,
                count: productData.length,
                data: productData.map((data) => {
                    return {
                        id: data.id,
                        name: data.name,
                        price: data.price,
                        category_id: data.category_id,
                    }
                })
            })
        }).catch(error => {
            next(error)
        })
}
