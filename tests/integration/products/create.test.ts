import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import productMock from '../../mocks/product.mock'
import ProductModel from '../../../src/database/models/product.model'

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('ao receber todos os campos em body, cria o produto e retornar corretamente', async function () {
    const httpResquestBody = productMock.validProductBody;

    const mockCreateReturn = ProductModel.build(productMock.returnCreateProduct);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
  
    const httpResponse = await chai.request(app).post('/products').send(httpResquestBody);

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(productMock.returnCreateProduct);
  })
});
