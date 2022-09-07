"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModels = void 0;
const database_1 = __importDefault(require("../database"));
const validateRequest_1 = __importDefault(require("../utilities/validateRequest"));
class OrderModels {
    async create(request) {
        (0, validateRequest_1.default)(request);
        try {
            const sqlQuery = 'INSERT INTO orders (status,user_id) VALUES($1, $2) RETURNING *';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery, [
                request.body.status,
                request.body.user_id
            ]);
            const order = result.rows[0];
            DBConnection.release();
            return order;
        }
        catch (error) {
            throw new Error(`Couldn't add order because Error: ${error}`);
        }
    }
    async getAllUserOrder(request) {
        (0, validateRequest_1.default)(request);
        try {
            const sqlQuery = 'SELECT * FROM orders where user_id = ($1)';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery, [
                request.params.user_id
            ]);
            const order = result.rows;
            DBConnection.release();
            if (!order) {
                throw new Error(`No orders to show for user ${request.params.user_id}`);
            }
            return order;
        }
        catch (error) {
            throw new Error(`Couldn't find orders show for user ${request.params.user_id} because Error: ${error}`);
        }
    }
}
exports.OrderModels = OrderModels;
