import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

// revisão backend 29/06/2022 - Turma 17

describe('Object User', () => {
  const encryptedPw = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'

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