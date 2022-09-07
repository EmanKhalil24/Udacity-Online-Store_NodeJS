"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const orderProductsHandlers_1 = require("../../handlers/orderProductsHandlers");
const checkTokens_1 = __importDefault(require("../../utilities/checkTokens"));
const order = (0, express_1.Router)();
order.post('/create', checkProductData(), orderProductsHandlers_1.create);
order.get('/show/:order_id', checkTokens_1.default, checkID(), orderProductsHandlers_1.getAllOrderProducts);
function checkID() {
    return [
        (0, express_validator_1.param)('order_id')
            .exists()
            .withMessage('you must enter order_id id')
            .isInt()
            .withMessage('invalid order id')
    ];
}
function checkProductData() {
    return [
        (0, express_validator_1.body)('quantity')
            .exists()
            .withMessage('you must enter quantity')
            .isInt()
            .withMessage('invalid quantity'),
        (0, express_validator_1.body)('product_id')
            .exists()
            .withMessage('you must enter product_id')
            .isInt()
            .withMessage('invalid product_id'),
        (0, express_validator_1.body)('order_id')
            .exists()
            .withMessage('you must enter order_id')
            .isInt()
            .withMessage('invalid order_id')
    ];
}
exports.default = order;
