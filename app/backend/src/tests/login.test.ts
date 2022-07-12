import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

// revisão backend 29/06/2022 - Turma 17

const encryptedPw = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

interface IResponseLogin {
  token: string
}

describe('Object User', () => {

  beforeEach(() => {
    sinon.stub(User, 'findOne')
      .resolves({ email:'email@exemple.com', password: encryptedPw } as User)
  });
  afterEach(() => {
    (User.findOne as sinon.SinonStub)
      .restore();
  });

  it('Method post /login - successful login', async () => {
    const response = await chai.request(app).post('/login').send({ email:'email@exemple.com', password: 'secret_admin' });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.instanceOf(Object);
    expect(response.body).to.include.keys('token');
  });

  it('Method post /login - missing field email', async () => {
    const response = await chai.request(app).post('/login').send({ email:'', password: 'secret_admin' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'All fields must be filled' });
  });

  it('Method post /login - missing field password', async () => {
    const response = await chai.request(app).post('/login').send({ email:'email@exemple.com', password: '' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'All fields must be filled' });
  });

  it('Method post /login - invalid password', async () => {
    const response = await chai.request(app).post('/login').send({ email:'email@exemple.com', password: '123456' });
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.eql({ message: 'Incorrect email or password' });
  });

  it('Method post /login - invalid email', async () => {
    const response = await chai.request(app).post('/login').send({ email:'invalid@email.com', password: 'secret_admin' });
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.eql({ message: 'Incorrect email or password' });
  });
});

describe('returns user "role" with get /login/validate route', () => {
  // before(() => {
  //   sinon.stub(User, 'findOne')
  //     .resolves({ email:'email@exemple.com', password: encryptedPw } as User)
  // });
  // after(() => {
  //   (User.findOne as sinon.SinonStub)
  //     .restore();
  // });

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImRhdGFWYWx1ZXMiOnsiaWQiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIn0sIl9wcmV2aW91c0RhdGFWYWx1ZXMiOnsiaWQiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIn0sIl9jaGFuZ2VkIjp7fSwiX29wdGlvbnMiOnsiaXNOZXdSZWNvcmQiOmZhbHNlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIiwicmF3Ijp0cnVlLCJhdHRyaWJ1dGVzIjpbImlkIiwidXNlcm5hbWUiLCJyb2xlIiwiZW1haWwiLCJwYXNzd29yZCJdfSwiaXNOZXdSZWNvcmQiOmZhbHNlfSwiaWF0IjoxNjU3NTc2MTcyLCJleHAiOjE2NTgxODA5NzJ9.85XVTgImscb9xDUSVpcLBwJlvOqKtUD0069C-itmDdk';
  
  it('Returns user role with valid token in headers.authorization', async () => {
    // const responseLogin = await chai.request(app).post('/login')
    //   .send({ email:'email@exemple.com', password: 'secret_admin' }); 

    // const { token } = responseLogin.body as IResponseLogin;

    const responseValidate = await chai.request(app).get('/login/validate')
      .set({ authorization: token });

    expect(responseValidate.status).to.be.equal(200);
    expect(responseValidate.body).to.be.eql({ "role": "admin" });
  })
})