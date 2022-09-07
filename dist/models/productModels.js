"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModels = void 0;
const database_1 = __importDefault(require("../database"));
const validateRequest_1 = __importDefault(require("../utilities/validateRequest"));
class ProductModels {
    async create(request) {
        (0, validateRequest_1.default)(request);
        try {
            const sqlQuery = 'INSERT INTO products (name,price, category_id) VALUES($1, $2, $3) RETURNING *';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery, [
                request.body.name,
                request.body.price,
                request.body.category_id
            ]);
            const product = result.rows[0];
            DBConnection.release();
            return product;
        }
        catch (error) {
            throw new Error(`Couldn't add ${request.body.name} because Error: ${error}`);
        }
    }
    async show(request) {
        (0, validateRequest_1.default)(request);
        try {
            const sqlQuery = 'SELECT * FROM products WHERE id=($1)';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery, [request.params.id]);
            const product = result.rows[0];
            DBConnection.release();
            if (!product) {
                throw new Error(`No product with this id = ${request.params.id}`);
            }
            return product;
        }
        catch (error) {
            throw new Error(`Couldn't find product with this id = ${request.params.id} because Error: ${error}`);
        }
    }
    async index(request) {
        (0, validateRequest_1.default)(request);
        try {
            const sqlQuery = 'SELECT * FROM products';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery);
            const product = result.rows;
            DBConnection.release();
            if (!product) {
                throw new Error('No products to show');
            }
            return product;
        }
        catch (error) {
            throw new Error(`Couldn't find products because Error: ${error}`);
        }
    }
}
exports.ProductModels = ProductModels;
