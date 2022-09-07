"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ordersHandlers_1 = require("../../handlers/ordersHandlers");
const checkTokens_1 = __importDefault(require("../../utilities/checkTokens"));
const order = (0, express_1.Router)();
order.post('/create', checkProductData(), ordersHandlers_1.create);
order.get('/show/:user_id', checkTokens_1.default, checkID(), ordersHandlers_1.getAllUserOrder);
function checkID() {
    return [
        (0, express_validator_1.param)('user_id')
            .exists()
            .withMessage('you must enter user id')
            .isInt()
            .withMessage('invalid user id')
    ];
}
function checkProductData() {
    return [
        (0, express_validator_1.body)('status')
            .exists()
            .withMessage('you must enter name')
            .isIn(['active', 'complete'])
            .withMessage('priority must be in active or complete'),
        (0, express_validator_1.body)('user_id')
            .exists()
            .withMessage('you must enter user_id')
            .isInt()
            .withMessage('invalid user_id')
    ];
}
exports.default = order;
