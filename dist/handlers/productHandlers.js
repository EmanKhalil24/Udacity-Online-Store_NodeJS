"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = exports.show = exports.create = void 0;
const productModels_1 = require("../models/productModels");
const newProduct = new productModels_1.ProductModels();
// #=======================================================================================#
// #			                              create                                       #
// #=======================================================================================#
const create = async (request, response, next) => {
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
        });
    }).catch(error => {
        next(error);
    });
};
exports.create = create;
// #=======================================================================================#
// #			                       get product by id                                   #
// #=======================================================================================#
const show = async (request, response, next) => {
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
        });
    }).catch(error => {
        next(error);
    });
};
exports.show = show;
// #=======================================================================================#
// #			                       get all products                                    #
// #=======================================================================================#
const index = async (request, response, next) => {
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
                };
            })
        });
    }).catch(error => {
        next(error);
    });
};
exports.index = index;
