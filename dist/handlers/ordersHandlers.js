"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserOrder = exports.create = void 0;
const ordersModels_1 = require("../models/ordersModels");
const newProduct = new ordersModels_1.OrderModels();
// #=======================================================================================#
// #			                           create                                          #
// #=======================================================================================#
const create = async (request, response, next) => {
    await newProduct.create(request)
        .then(orderData => {
        response.json({
            status: 1,
            data: {
                id: orderData.id,
                status: orderData.status,
                user_id: orderData.user_id,
            }
        });
    }).catch(error => {
        next(error);
    });
};
exports.create = create;
// #=======================================================================================#
// #			                        get all user orders                                #
// #=======================================================================================#
const getAllUserOrder = async (request, response, next) => {
    await newProduct.getAllUserOrder(request)
        .then(orderData => {
        response.json({
            status: 1,
            count: orderData.length,
            data: orderData.map((data) => {
                return {
                    id: data.id,
                    status: data.status,
                    user_id: data.user_id,
                };
            })
        });
    }).catch(error => {
        next(error);
    });
};
exports.getAllUserOrder = getAllUserOrder;
