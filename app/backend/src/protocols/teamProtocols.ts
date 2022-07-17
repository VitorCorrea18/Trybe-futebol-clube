export interface ITeam {
  id: number,
  teamName: string,
}

export interface ITeamService {
  getAll(): Promise<object>
}

export interface ITeamModel {
  findOne(data: number): Promise<ITeam>
}
