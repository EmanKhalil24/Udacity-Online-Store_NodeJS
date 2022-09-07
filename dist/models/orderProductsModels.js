"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProductsModels = void 0;
const database_1 = __importDefault(require("../database"));
const validateRequest_1 = __importDefault(require("../utilities/validateRequest"));
class orderProductsModels {
    async create(request) {
        (0, validateRequest_1.default)(request);
        try {
            const sqlQuery = 'INSERT INTO order_products (quantity,product_id,order_id) VALUES($1, $2, $3) RETURNING *';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery, [
                request.body.quantity,
                request.body.product_id,
                request.body.order_id
            ]);
            const order = result.rows[0];
            DBConnection.release();
            return order;
        }
        catch (error) {
            throw new Error(`Couldn't add order because Error: ${error}`);
        }
    }
    async getAllOrderProducts(request) {
        (0, validateRequest_1.default)(request);
        try {
            const sqlQuery = 'SELECT * FROM order_products where order_id = ($1)';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery, [
                request.params.order_id
            ]);
            const products = result.rows;
            DBConnection.release();
            if (!products) {
                throw new Error(`No products to show for order = ${request.params.order_id}`);
            }
            return products;
        }
        catch (error) {
            throw new Error(`Couldn't find products show for order = ${request.params.user_id} because Error: ${error}`);
        }
    }
}
exports.orderProductsModels = orderProductsModels;
