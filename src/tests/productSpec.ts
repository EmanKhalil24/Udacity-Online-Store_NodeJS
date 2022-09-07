import { product, ProductModels } from '../models/productModels';

const products = new ProductModels()

describe('ProductModels', () => {
    it('should have an index method', () => {
        expect(products.index).toBeDefined();
    })
    it('should have a show method', () => {
        expect(products.show).toBeDefined();
    })
    it('should have a create method', () => {
        expect(products.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(products.delete).toBeDefined();
    });
    it('index method should return a list of products', () => {
        const result = await products.index()
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    it('show method should return one product', async () => {
        const p: product = {name: 'product 1' , price: 200};
        const createdProduct = await products.create(p);
        const result = await products.show((createdProduct.id as unknown) as string);
        expect(result.name).toEqual('product 1');
        expect(result.price).toEqual(200);
    });
    it('create method should return the created product', async () => {
        const p: product = {name: 'product 2', price: 200};
        const createdProduct = await products.create(p);
        expect(result.name).toEqual('product 2');
        expect(result.price).toEqual(200);
    });

    it('delete method should delete the product', async () => {
        const delete = await products.delete('1');
        expect(delete).toBeDefined();
    });
})