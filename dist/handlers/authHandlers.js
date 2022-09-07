"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.index = exports.show = exports.login = exports.create = void 0;
const userModels_1 = require("../models/userModels");
const newUser = new userModels_1.UserModels();
const create = async (request, response, next) => {
    await newUser
        .create(request)
        .then((userData) => {
        response.json({
            status: 1,
            data: {
                id: userData.id,
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name
            }
        });
    })
        .catch((error) => {
        next(error);
    });
};
exports.create = create;
const login = async (request, response, next) => {
    await newUser
        .login(request)
        .then((userData) => {
        response.json({
            status: 1,
            token: userData.token,
            data: {
                id: userData.id,
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name
            }
        });
    })
        .catch((error) => {
        next(error);
    });
};
exports.login = login;
const show = async (request, response, next) => {
    await newUser
        .show(request)
        .then((userData) => {
        response.json({
            status: 1,
            token: userData.token,
            data: {
                id: userData.id,
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name
            }
        });
    })
        .catch((error) => {
        next(error);
    });
};
exports.show = show;
const index = async (request, response, next) => {
    await newUser
        .index(request)
        .then((userData) => {
        response.json({
            status: 1,
            count: userData.length,
            data: userData.map((data) => {
                return {
                    id: data.id,
                    token: data.token,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name
                };
            })
        });
    })
        .catch((error) => {
        next(error);
    });
};
exports.index = index;
const logout = async (request, response, next) => {
    await newUser
        .logout(request)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((_) => {
        response.json({
            status: 1,
            data: 'logout successful'
        });
    })
        .catch((error) => {
        next(error);
    });
};
exports.logout = logout;
