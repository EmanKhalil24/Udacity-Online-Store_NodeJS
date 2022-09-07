"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModels = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
const validateRequest_1 = __importDefault(require("../utilities/validateRequest"));
class UserModels {
    async create(request) {
        (0, validateRequest_1.default)(request);
        try {
            const hashPassword = bcryptjs_1.default.hashSync(request.body.password, 10);
            const sqlQuery = 'INSERT INTO users (email,first_name, last_name, password,token) VALUES($1, $2, $3,$4,null) RETURNING *';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery, [
                request.body.email.toLocaleLowerCase(),
                request.body.first_name,
                request.body.last_name,
                hashPassword
            ]);
            const user = result.rows[0];
            DBConnection.release();
            return user;
        }
        catch (error) {
            throw new Error(`Couldn't add ${request.body.first_name} ${request.body.last_name} because Error: ${error}`);
        }
    }
    async login(request) {
        (0, validateRequest_1.default)(request);
        try {
            let sqlQuery = 'SELECT * FROM users WHERE email=($1)';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery, [
                request.body.email.toLocaleLowerCase()
            ]);
            const user = result.rows[0];
            if (!user) {
                throw new Error(`No user with this email = ${request.body.email}`);
            }
            const IsValidPassword = bcryptjs_1.default.compareSync(request.body.password, user.password);
            if (!IsValidPassword) {
                throw new Error(`invalid password`);
            }
            else {
                // to add token to router
                user.token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: 86400 //for 24 hour
                });
                sqlQuery = 'UPDATE users SET token = ($1) WHERE id=($2)';
                await DBConnection.query(sqlQuery, [user.token, user.id]);
            }
            DBConnection.release();
            return user;
        }
        catch (error) {
            throw new Error(`Couldn't add ${request.body.first_name} ${request.body.last_name}} because Error: ${error}`);
        }
    }
    async show(request) {
        (0, validateRequest_1.default)(request);
        try {
            const sqlQuery = 'SELECT * FROM users WHERE id=($1)';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery, [request.params.id]);
            const user = result.rows[0];
            DBConnection.release();
            if (!user) {
                throw new Error(`No user with this id = ${request.params.id}`);
            }
            return user;
        }
        catch (error) {
            throw new Error(`Couldn't find user with this id = ${request.params.id} because Error: ${error}`);
        }
    }
    async index(request) {
        (0, validateRequest_1.default)(request);
        try {
            const sqlQuery = 'SELECT * FROM users';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery);
            const user = result.rows;
            DBConnection.release();
            if (!user) {
                throw new Error('No users to show');
            }
            return user;
        }
        catch (error) {
            throw new Error(`Couldn't find users because Error: ${error}`);
        }
    }
    async logout(request) {
        (0, validateRequest_1.default)(request);
        try {
            const sqlQuery = 'UPDATE users SET token = null WHERE id=($1)';
            const DBConnection = await database_1.default.connect();
            const result = await DBConnection.query(sqlQuery, [request.params.id]);
            const user = result.rows[0];
            DBConnection.release();
            return user;
        }
        catch (error) {
            throw new Error(`Couldn't find user with this id = ${request.params.id} because Error: ${error}`);
        }
    }
}
exports.UserModels = UserModels;
