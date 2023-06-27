import ProductModel, {
  ProductInputtableTypes,
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

export default {
  create,
};