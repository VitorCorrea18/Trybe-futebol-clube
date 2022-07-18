export interface IMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome?: {
    teamName: string
  },
  teamAway?: {
    teamName: string
  }
}

export interface IMatchService {
  getAll(): Promise<IMatch[]>
}

export interface IMatchModel {
  findAll(): Promise<IMatch[]>
  findInProgress(inProgress: boolean): Promise<IMatch[]>
  findOne(id: number): Promise<IMatch>
}
