import express from 'express';
import loginRouter from './routers/login.router';
import orderRouter from './routers/orders.router';
import productRouter from './routers/products.router';

const app = express();

app.use(express.json());
app.use(productRouter);
app.use(orderRouter);
app.use(loginRouter);

export default app;
