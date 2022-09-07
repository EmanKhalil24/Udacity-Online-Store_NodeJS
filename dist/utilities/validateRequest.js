"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function validateRequest(request) {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        const error = new Error();
        error.message = errors
            .array()
            .reduce((current, object) => current + object.msg + '   |   ', '');
        throw error;
    }
}
exports.default = validateRequest;
