export interface ITeam {
  id: number,
  teamName: string,
}

export interface ITeamService {
  getById(id:number): Promise<object>
  getAll(): Promise<ITeam[]>
}

export interface ITeamModel {
  findOne(data: number): Promise<ITeam>
  findAll(): Promise<ITeam[]>
  findAllMatches(data: object): Promise<object>
}
