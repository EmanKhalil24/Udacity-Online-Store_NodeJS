"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkTokens = (request, response, next) => {
    const authHeader = request.headers['authorization'] ||
        request.body.token ||
        request.query.token;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        const error = new Error('You must enter token');
        // error.status = 403;
        throw error;
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                const error = new Error('invalid token');
                // error.status = 403;
                throw error;
            }
            else {
                request.user = decoded;
                next();
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.default = checkTokens;
