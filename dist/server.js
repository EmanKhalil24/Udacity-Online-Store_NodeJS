"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morganMiddleware_1 = __importDefault(require("./middleware/morganMiddleware"));
const notFoundMiddleware_1 = __importDefault(require("./middleware/notFoundMiddleware"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.listen(process.env.PORT || 8888, () => {
    console.log(`App Run to http://${process.env.HOST}:${process.env.PORT || 8888}`);
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('', morganMiddleware_1.default, routes_1.default);
app.use(notFoundMiddleware_1.default);
app.use(errorMiddleware_1.default);
exports.default = app;
