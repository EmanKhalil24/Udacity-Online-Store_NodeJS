import express from 'express';
import 'dotenv/config';
import body_parser from 'body-parser';
import cors from 'cors';

import morganMiddleware from './middleware/morganMiddleware';
import notFoundMiddleware from './middleware/notFoundMiddleware';
import errorMiddleware from './middleware/errorMiddleware';

import routes from './routes/routes';

const app = express();
app.listen(process.env.PORT || 8888, () => {
   console.log(
      `App Run to http://${process.env.HOST}:${process.env.PORT || 8888}`
   );
});
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cors());
app.use('', morganMiddleware, routes);
app.use(notFoundMiddleware);

app.use(errorMiddleware);
export default app;
