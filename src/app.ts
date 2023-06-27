import express from 'express';
import orderRouter from './routers/orders.router';
import productRouter from './routers/products.router';

const app = express();

app.use(express.json());
app.use(productRouter);
app.use(orderRouter);

export default app;
