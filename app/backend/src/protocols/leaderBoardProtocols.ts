export interface ITeamBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
}

export interface IMatchGoals {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export interface ITeamMatches {
  teamName: string,
  teamHome: IMatchGoals[]
}

export interface ILeaderBoardService {
  getLeaderBoardHome(): Promise<unknown>
}
