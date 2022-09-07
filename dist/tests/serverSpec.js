"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('check Endpoint API', () => {
    describe('check user Endpoint', () => {
        it('POST /user/create', async () => {
            const response = await request.post('/user/create').send({
                email: 'emankhalil9688896@gmail.com',
                first_name: 'Eman',
                last_name: 'Khalil',
                password: 'engeman24'
            });
            expect(response.status).toBe(200);
        });
        it('POST /user/login', async () => {
            const response = await request.post('/user/login').send({
                email: 'emankhalil9688896@gmail.com',
                password: 'engeman24'
            });
            expect(response.status).toBe(500);
        });
        it('GET /user/show/id', async () => {
            const response = await request.get('/user/show/1');
            expect(response.status).toBe(500);
        });
        it('GET /user/index', async () => {
            const response = await request.get('/user/index');
            expect(response.status).toBe(500);
        });
        it('POST /user/logout/id', async () => {
            const response = await request.post('/user/logout/1');
            expect(response.status).toBe(500);
        });
    });
    describe('check wrong login Endpoint', () => {
        it('POST /loginAnyThing', async () => {
            const response = await request.post('/loginAnyThing');
            expect(response.status).toBe(404);
        });
    });
    describe('check product Endpoint', () => {
        it('POST /product/create', async () => {
            const response = await request.post('/product/create').send({
                name: 'chocolate',
                price: 30,
                category_id: 1
            });
            expect(response.status).toBe(500);
        });
        it('GET /product/Index', async () => {
            const response = await request.get('/product/Index');
            expect(response.status).toBe(500);
        });
        it('GET /product/show/id', async () => {
            const response = await request.get('/product/show/1');
            expect(response.status).toBe(500);
        });
    });
    describe('check order Endpoint', () => {
        it('POST /order/create', async () => {
            const response = await request.post('/order/create').send({
                status: 'active',
                user_id: 1
            });
            expect(response.status).toBe(200);
        });
        it('GET /order/show/user_id', async () => {
            const response = await request.get('/order/show/1');
            expect(response.status).toBe(500);
        });
    });
    describe('check order product Endpoint', () => {
        it('POST /orderProduct/create', async () => {
            const response = await request
                .post('/orderProduct/create')
                .send({
                quantity: 15,
                product_id: 1,
                order_id: 1
            });
            expect(response.status).toBe(500);
        });
        it('GET /orderProduct/show/order_id', async () => {
            const response = await request.get('/orderProduct/show/1');
            expect(response.status).toBe(500);
        });
    });
});
