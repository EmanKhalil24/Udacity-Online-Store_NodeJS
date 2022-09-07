"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productHandlers_1 = require("../../handlers/productHandlers");
const checkTokens_1 = __importDefault(require("../../utilities/checkTokens"));
const product = (0, express_1.Router)();
product.post('/create', checkProductData(), productHandlers_1.create);
product.get('/Index', checkTokens_1.default, productHandlers_1.index);
product.get('/show/:id', checkTokens_1.default, checkID(), productHandlers_1.show);
function checkID() {
    return [
        (0, express_validator_1.param)('id')
            .exists()
            .withMessage('you must enter product id')
            .isInt()
            .withMessage('invalid product id')
    ];
}
function checkProductData() {
    return [
        (0, express_validator_1.body)('name')
            .exists()
            .withMessage('you must enter name')
            .isAlpha()
            .withMessage('invalid name'),
        (0, express_validator_1.body)('price')
            .exists()
            .withMessage('you must enter price')
            .isInt()
            .withMessage('invalid price'),
        (0, express_validator_1.body)('category_id')
            .exists()
            .withMessage('you must enter category_id')
            .isInt()
            .withMessage('invalid category_id')
    ];
}
exports.default = product;
