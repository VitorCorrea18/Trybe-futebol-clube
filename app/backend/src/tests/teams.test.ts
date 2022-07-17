import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { messages } from '../utils'

chai.use(chaiHttp);

const { expect } = chai;

describe('Object Team', () => {

  const FakeTeam1 = { id: 5, teamName: "Cruzeiro" };
  const FakeTeam2 = { id: 4, teamName: "Atletico" };
  const arrayOfTeams =  [ FakeTeam1, FakeTeam2 ];

  beforeEach(() => {
    sinon.stub(Team, 'findOne')
      .resolves(FakeTeam1 as Team);
    
    sinon.stub(Team, 'findAll')
    .resolves([FakeTeam1, FakeTeam2] as Team[]);
  });
  afterEach(() => {
    (Team.findOne as sinon.SinonStub)
      .restore();

    (Team.findAll as sinon.SinonStub)
      .restore();
  });

  it('Method get /teams/:id - Succes', async () => {
    const response = await chai.request(app).get('/teams/5');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(FakeTeam1);
  });

  it('Method get /teams/:id - Invalid ID', async () => {
    const response = await chai.request(app).get('/teams/a');
    expect(response.status).to.be.eql(422);
    expect(response.body).to.be.eql({ message: messages.invalidId });
  });

  it('Method get /teams', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.eql(200);
    expect(response.body).to.be.eql(arrayOfTeams);
  })
});
