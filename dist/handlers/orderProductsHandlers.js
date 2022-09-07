"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrderProducts = exports.create = void 0;
const orderProductsModels_1 = require("../models/orderProductsModels");
const newOrderProduct = new orderProductsModels_1.orderProductsModels();
const create = async (request, response, next) => {
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
exports.create = create;
const getAllOrderProducts = async (request, response, next) => {
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
exports.getAllOrderProducts = getAllOrderProducts;
