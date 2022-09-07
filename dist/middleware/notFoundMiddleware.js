"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (request, response, next) => {
    response.status(404).json({
        status: 0,
        message: 'Not Found'
    });
};
exports.default = notFound;
