"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authHandlers_1 = require("../../handlers/authHandlers");
const checkTokens_1 = __importDefault(require("../../utilities/checkTokens"));
const auth = (0, express_1.Router)();
auth.post('/login', checkEmailAndPassword(), authHandlers_1.login);
auth.post('/create', checkEmailAndPassword(), checkUserName(), authHandlers_1.create);
auth.get('/Index', checkTokens_1.default, authHandlers_1.index);
auth.get('/show/:id', checkTokens_1.default, checkID(), authHandlers_1.show);
auth.post('/logout/:id', checkTokens_1.default, checkID(), authHandlers_1.logout);
function checkID() {
    return [
        (0, express_validator_1.param)('id')
            .exists()
            .withMessage('you must enter user id')
            .isInt()
            .withMessage('invalid user id')
    ];
}
function checkEmailAndPassword() {
    return [
        (0, express_validator_1.body)('email')
            .exists()
            .withMessage('you must enter email')
            .isEmail()
            .withMessage('invalid email'),
        (0, express_validator_1.body)('password')
            .exists()
            .withMessage('you must enter password')
            .isStrongPassword()
            .withMessage('Password Must contain at least 1 characters(upper and lower),numbers,special characters')
    ];
}
function checkUserName() {
    return [
        (0, express_validator_1.body)('first_name')
            .exists()
            .withMessage('you must enter first_name')
            .isString()
            .withMessage('invalid first_name'),
        (0, express_validator_1.body)('last_name')
            .exists()
            .withMessage('you must enter last_name')
            .isString()
            .withMessage('invalid last_name')
    ];
}
exports.default = auth;
