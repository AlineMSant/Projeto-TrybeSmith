import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productMock from '../../mocks/product.mock'
import { ServiceResponse } from '../../../src/types/ServiceResponse'
import { Product } from '../../../src/types/Product';
import ProductService from '../../../src/services/product.service';
import ProductController from '../../../src/controllers/product.controller';


chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('ao receber todos os campos em body, cria o produto e retornar corretamente para a camada controller', async function () {
    req.body = productMock.validProductBody;
    const serviceResponse: ServiceResponse<Product> = {
      status: 'SUCCESSFUL',
      data: productMock.returnCreateProduct,
    }
    sinon.stub(ProductService, 'create').resolves(serviceResponse);

    await ProductController.create(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMock.returnCreateProduct)
  })

});
