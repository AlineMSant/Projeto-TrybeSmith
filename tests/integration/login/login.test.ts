import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

it('ao não receber um username, retorne um erro', async function () {
    const httpRequestBody = loginMock.noEmailLoginBody;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
});

it('ao não receber uma senha, retorne um erro', async function () {
  const httpRequestBody = loginMock.noPasswordLoginBody

  const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

  expect(httpResponse.status).to.equal(400);
  expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
});

it('ao receber um username inexistente, retorne um erro', async function () {
  const httpRequestBody = loginMock.notExistingUserBody
  sinon.stub(UserModel, 'findOne').resolves(null);

  const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

  expect(httpResponse.status).to.equal(401);
  expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
});

it('ao receber um username existente e uma senha errada, retorne um erro', async function () {

  const httpRequestBody = loginMock.existingUserWithWrongPasswordBody 
  const mockFindOneReturn = UserModel.build(loginMock.existingUser);
  sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);


  const httpResponse = await chai.request(app).post('/login')
    .send(httpRequestBody);

  expect(httpResponse.status).to.equal(401);
  expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
});

it('ao receber um username e uma senha válida, retorne um token de login', async function () {
  const httpRequestBody = loginMock.validLoginBody
  const mockFindOneReturn = UserModel.build(loginMock.existingUser);
  sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

  const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

  expect(httpResponse.status).to.equal(200);
  expect(httpResponse.body).to.have.key('token');
});

});
