export interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
  teamHome?: {
    teamName: string
  },
  teamAway?: {
    teamName: string
  }
}

export interface IMatchService {
  getAll(): Promise<IMatch[]>
  getInProgress(inProgress: string): Promise<IMatch[]>
  create(payload:object): Promise<IMatch>
  updateGoals(id: number, matchGoals: object): Promise<void>
  finishMatch(id: number): Promise<number>
}

export interface IMatchModel {
  findAll(data: object): Promise<IMatch[]>
  findAllInProgress(inProgress:object, data: object): Promise<IMatch[]>
  create(data: object): Promise<IMatch>
  update(update: object, data: object): Promise<number>
}
