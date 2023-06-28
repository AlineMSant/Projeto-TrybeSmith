import { Router } from 'express';
import productController from '../controllers/product.controller';
import nameMiddleware from '../middlewares/name.middleware';
import priceMiddleware from '../middlewares/price.middleware';

const productRouter = Router();

productRouter.post('/products', nameMiddleware, priceMiddleware, productController.create);

productRouter.get('/products', productController.findAll);

export default productRouter;