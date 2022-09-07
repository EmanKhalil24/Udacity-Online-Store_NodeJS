"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error = (error, request, response, next) => {
    let status = error.status || 500;
    response.status(status).json({
        status: 0,
        error: error.message + ''
    });
};
exports.default = error;
