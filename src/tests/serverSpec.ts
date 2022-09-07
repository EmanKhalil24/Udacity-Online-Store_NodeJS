import supertest, { SuperTest, Test, Response } from 'supertest';
import app from '../server';

const request: SuperTest<Test> = supertest(app);

describe('check Endpoint API', (): void => {
   describe('check user Endpoint', (): void => {
      it('POST /user/create', async (): Promise<void> => {
         const response: Response = await request.post('/user/create').send({
            email: 'emankhalil9688896@gmail.com',
            first_name: 'Eman',
            last_name: 'Khalil',
            password: 'engeman24'
         });
         expect(response.status).toBe(200);
      });

      it('POST /user/login', async (): Promise<void> => {
         const response: Response = await request.post('/user/login').send({
            email: 'emankhalil9688896@gmail.com',
            password: 'engeman24'
         });
         expect(response.status).toBe(500);
      });

      it('GET /user/show/id', async (): Promise<void> => {
         const response: Response = await request.get('/user/show/1');
         expect(response.status).toBe(500);
      });

      it('GET /user/index', async (): Promise<void> => {
         const response: Response = await request.get('/user/index');
         expect(response.status).toBe(500);
      });

      it('POST /user/logout/id', async (): Promise<void> => {
         const response: Response = await request.post('/user/logout/1');
         expect(response.status).toBe(500);
      });
   });

   describe('check wrong login Endpoint', (): void => {
      it('POST /loginAnyThing', async (): Promise<void> => {
         const response: Response = await request.post('/loginAnyThing');
         expect(response.status).toBe(404);
      });
   });

   describe('check product Endpoint', (): void => {
      it('POST /product/create', async (): Promise<void> => {
         const response: Response = await request.post('/product/create').send({
            name: 'chocolate',
            price: 30,
            category_id: 1
         });
         expect(response.status).toBe(500);
      });

      it('GET /product/Index', async (): Promise<void> => {
         const response: Response = await request.get('/product/Index');
         expect(response.status).toBe(500);
      });

      it('GET /product/show/id', async (): Promise<void> => {
         const response: Response = await request.get('/product/show/1');
         expect(response.status).toBe(500);
      });
   });

   describe('check order Endpoint', (): void => {
      it('POST /order/create', async (): Promise<void> => {
         const response: Response = await request.post('/order/create').send({
            status: 'active',
            user_id: 1
         });
         expect(response.status).toBe(200);
      });

      it('GET /order/show/user_id', async (): Promise<void> => {
         const response: Response = await request.get('/order/show/1');
         expect(response.status).toBe(500);
      });
   });

   describe('check order product Endpoint', (): void => {
      it('POST /orderProduct/create', async (): Promise<void> => {
         const response: Response = await request
            .post('/orderProduct/create')
            .send({
               quantity: 15,
               product_id: 1,
               order_id: 1
            });
         expect(response.status).toBe(500);
      });

      it('GET /orderProduct/show/order_id', async (): Promise<void> => {
         const response: Response = await request.get('/orderProduct/show/1');
         expect(response.status).toBe(500);
      });
   });
});
