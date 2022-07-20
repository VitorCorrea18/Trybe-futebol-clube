import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';
import { messages } from '../utils'
import { IMatch } from '../protocols';
import { before } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

const onGoingMatch: IMatch = {
  "id": 41,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 9,
  "awayTeamGoals": 0,
  "inProgress": true,
  "teamHome": {
    "teamName": "São Paulo"
  },
  "teamAway": {
    "teamName": "Internacional"
  }
};

const finishedMatch: IMatch = {
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 1,
  "awayTeam": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "teamHome": {
    "teamName": "São Paulo"
  },
  "teamAway": {
    "teamName": "Grêmio"
  }
};

const allMatches: IMatch[] = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  }
]

describe('Object Matches', () => {

  beforeEach(() => {
    sinon.stub(Match, 'findAll')
      .resolves(allMatches as Match[]);

    sinon.stub(Match, 'create')
      .resolves({
      "id": 49,
      "homeTeam": 16,
      "awayTeam": 14,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    } as Match);

    sinon.stub(Match, 'update')
      .resolves();
  })

  afterEach(() => {
    (Match.findAll as sinon.SinonStub)
      .restore();
    (Match.create as sinon.SinonStub)
      .restore();
    (Match.update as sinon.SinonStub)
      .restore();
  });


  it('Method GET /matches', async () => {
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.eql(200);
    expect(response.body).to.be.eql(allMatches);
  });

  it('Method POST /matches', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImRhdGFWYWx1ZXMiOnsiaWQiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIn0sIl9wcmV2aW91c0RhdGFWYWx1ZXMiOnsiaWQiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIn0sIl9jaGFuZ2VkIjp7fSwiX29wdGlvbnMiOnsiaXNOZXdSZWNvcmQiOmZhbHNlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIiwicmF3Ijp0cnVlLCJhdHRyaWJ1dGVzIjpbImlkIiwidXNlcm5hbWUiLCJyb2xlIiwiZW1haWwiLCJwYXNzd29yZCJdfSwiaXNOZXdSZWNvcmQiOmZhbHNlfSwiaWF0IjoxNjU3NTc2MTcyLCJleHAiOjE2NTgxODA5NzJ9.85XVTgImscb9xDUSVpcLBwJlvOqKtUD0069C-itmDdk';

    const response = await chai.request(app).post('/matches')
    .set({ Authorization: token }).send({
      homeTeam: 16,
      awayTeam: 14,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      });

    expect(response.status).to.be.eql(201);
    expect(response.body).to.be.eql({
      "id": 49,
      "homeTeam": 16,
      "awayTeam": 14,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    })
  })

  it('Method PATCH /matches', async () => {
    const response = await chai.request(app).patch('/matches/41').send({ homeTeamGoals: 3, awayTeamGoals: 1 });
    expect(response.status).to.be.eql(200);
    expect(response.body).to.be.eql({ message: 'Match updated!' });
  })

});
