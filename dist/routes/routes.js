"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./api/authRouter"));
const productRouter_1 = __importDefault(require("./api/productRouter"));
const orderRouter_1 = __importDefault(require("./api/orderRouter"));
const orderProductsRouter_1 = __importDefault(require("./api/orderProductsRouter"));
const routes = express_1.default.Router();
routes.use('/user', authRouter_1.default);
routes.use('/product', productRouter_1.default);
routes.use('/order', orderRouter_1.default);
routes.use('/orderProduct', orderProductsRouter_1.default);
exports.default = routes;
