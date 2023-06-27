import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });


  it('ao enviar a solicitação para a rota GET/products, todos os produtos são retornados', async function () {
    const mockFindAllReturn = ProductModel.build(productMock.returnAllProducts[0]);
    sinon.stub(ProductModel, 'findAll').resolves([mockFindAllReturn]);

    const httpResponse = await chai.request(app).get('/products');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(productMock.returnAllProducts);
  })
});
