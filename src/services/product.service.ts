import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';

import { ServiceResponse } from '../types/ServiceResponse';
import { Product } from '../types/Product';

async function create(
  product: ProductInputtableTypes,
): Promise<ServiceResponse<Product>> {
  const newProduct = await ProductModel.create(product);

  const responseService: ServiceResponse<Product> = {
    status: 'SUCCESSFUL', data: newProduct.dataValues };

  return responseService;
}

async function findAll(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: products };
}

export default {
  create,
  findAll,
};