<h1 align="center">Udacity Online Store Node.js</h1>

## Description:

The goal of the project is to create an online store, users can create their personal accounts on the site, they can browse the existing products, and can add these products to the card with numbers in order to buy them.

## To run this project

`Step 1` : To use this project must install [Node.js](https://nodejs.org/en/) and [pgadmin](https://www.pgadmin.org/download/) Then Download the source code

```
git clone https://github.com/MohamedAlabasy/Udacity-Node.JS-Online-Store.git
```

`Step 2` : Enter the project file then install package

```
npm i
```

<h3 align="center">To help you understand the project</h3>

## Api Endpoints

<h4 align="center">user</h4>

```bash
`LOGIN` route: 'user/login' [POST]
`CREATE` new user route: 'user/create' [POST]
`INDEX` get all users route: 'user/Index' [GET]
`SHOW` user by ID route: 'user/show/:id' [GET]
`LOGOUT` new user route: 'user/logout/:id' [POST]
```

<h4 align="center">product</h4>

```bash
`CREATE` new product route: 'product/create' [POST]
`INDEX` to get all products route: 'product/Index' [GET]
`SHOW` product by ID route: 'product/show/:id' [GET]
```

<h4 align="center">order</h4>

```bash
`CREATE` new order route: 'order/create' [POST]
`SHOW` all user order route: 'order/show/:user_id' [GET]
```

<h4 align="center">order product</h4>

```bash
`CREATE` new order route: 'orderProduct/create' [POST]
`SHOW` all user order route: 'orderProduct/show/:order_id' [GET]
```

## Folder Structure

```bash
├── src
│   ├── handlers
│   │   ├── authHandlers.ts => `for handel authentication function`
│   │   ├── orderProductsHandlers.ts => `for handel orders product function`
│   │   ├── ordersHandlers.ts => `for handel orders function`
│   │   └── productHandlers.ts => `for handel product function`
│   │
│   │
│   ├── middleware
│   │   ├── morganMiddleware.ts => `for log url, method and statue of requests`
│   │   │── notFoundMiddleware.ts => `for not Found Middleware`
│   │   └── errorMiddleware.ts => `for error Middleware`
│   │
│   │
│   ├── models
│   │   ├── ordersModels.ts => `for handel orders Models and functions used in handler`
│   │   ├── orderProductsModels.ts => `for handel orders product Models and functions used in handler`
│   │   │── productModels.ts => `for handel product Models and functions used in handler`
│   │   └── userModels.ts => `for handel user Models and functions used in handler`
│   │
│   │
│   ├── routes
│   │   ├── api
│   │   │   │── authRouter.ts => `for handel authentication route`
│   │   │   │── orderProductsRouter.ts => `for handel order products route`
│   │   │   │── orderRouter.ts => `for handel order route`
│   │   │   └── productRouter.ts => `for handel product route`
│   │   └── routes.ts => `import all routes and exports it to index`
│   │
│   │
│   ├── tests => `for testing purposes`
│   │   ├── helpers
│   │   │   └── reporter.ts
│   │   └── serverSpec.ts => `for testing endpoint api`
│   │
│   │
│   ├── utilities
│   │   │── checkTokens.ts => `for Request check Tokens`
│   │   └── validateRequest.ts => `for validate Request`
│   │
│   │
│   ├── database.ts => `to handel database driver`
│   └── index.ts => `to run the server`
└──
```

## DataBase ERD

<p align="center">
   <img src="https://user-images.githubusercontent.com/93389016/179218031-acf562c7-65e1-4617-b0cb-3b577cb2ef92.jpg" alt="Build Status">

`Step 3` : To run project

```
node run watch
```

`Step 4` : Open the browser and click : [http://localhost:8080](http://localhost:8080)

`Step 5` : Open [postman](https://www.postman.com/downloads/) and import : [API Collation](https://github.com/MohamedAlabasy/Udacity-Node.JS-Online-Store/blob/main/api_collection.json) You will find it in the project files.

<hr>
To run eslint to check error

```
npm run lint
```

To run eslint and auto fixed error

```
npm run lint:f
```

To compile the TS code

```
npm run tsc
```

To run the JS code

```
node dist/server.js
```

To run test

```
npm run tests
```