import { expect } from 'chai';
import sinon from 'sinon';

import productMock from '../../mocks/product.mock'
import ProductModel from '../../../src/database/models/product.model'
import ProductService from '../../../src/services/product.service';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

it('ao receber todos os campos em body, cria o produto e retornar corretamente para a camada service', async function () {
  const body = productMock.validProductBody;
  const mockCreateReturn = ProductModel.build(productMock.returnCreateProduct);
  sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

  const serviceResponse = await ProductService.create(body);

  expect(serviceResponse.status).to.equal('SUCCESSFUL');
  expect(serviceResponse.data).to.deep.equal(productMock.returnCreateProduct);
})
});
