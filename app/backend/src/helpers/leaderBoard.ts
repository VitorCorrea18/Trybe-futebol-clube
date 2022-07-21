import { IMatchGoals, ITeamMatches, ITeamBoard } from '../protocols';

// https://github.com/tryber/sd-017-trybe-futebol-clube/pull/56/commits/5d5ea92a2e50526c4d2a42ad853d3575e6da8724#diff-bbeb88733345f99a2b06358830fabaeb5bed207b1707434948ba68cf48b11194

export const getVictories = (data: IMatchGoals[]): number => {
  let victories = 0;
  data.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      victories += 1;
    }
  });
  return victories;
};

export const getLosses = (data: IMatchGoals[]): number => {
  let losses = 0;
  data.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals < awayTeamGoals) {
      losses += 1;
    }
  });
  return losses;
};

export const getDraws = (data: IMatchGoals[]): number => {
  let draws = 0;
  data.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals === awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};

export const getGoalsFavor = (data: IMatchGoals[]): number => {
  let goalsFavor = 0;
  data.forEach((match) => {
    const { homeTeamGoals } = match;
    goalsFavor += homeTeamGoals;
  });
  return goalsFavor;
};

export const getGoalsOwn = (data: IMatchGoals[]): number => {
  let goalsOwn = 0;
  data.forEach((match) => {
    const { awayTeamGoals } = match;
    goalsOwn += awayTeamGoals;
  });
  return goalsOwn;
};

export const getGoalsBalance = (data: IMatchGoals[]): number => {
  const favor = getGoalsFavor(data);
  const own = getGoalsOwn(data);
  const goalsBalance = favor - own;
  return goalsBalance;
};

export const getTotalPoints = (data: IMatchGoals[]): number => {
  const victories = getVictories(data);
  const draws = getDraws(data);
  const total = victories * 3 + draws;

  return total;
};

export const getEfficiency = (data: IMatchGoals[]): string => {
  const points = getTotalPoints(data);
  const matches = data.length;
  const efficiency = (points / (matches * 3)) * 100;
  return efficiency.toFixed(2);
};

export const buildBoard = (data: ITeamMatches[]): ITeamBoard[] => {
  const board = data.map((team) => ({
    name: team.teamName,
    totalPoints: getTotalPoints(team.teamHome),
    totalGames: team.teamHome.length,
    totalVictories: getVictories(team.teamHome),
    totalDraws: getDraws(team.teamHome),
    totalLosses: getLosses(team.teamHome),
    goalsFavor: getGoalsFavor(team.teamHome),
    goalsOwn: getGoalsOwn(team.teamHome),
    goalsBalance: getGoalsBalance(team.teamHome),
    efficiency: getEfficiency(team.teamHome),
  }));
  return board as ITeamBoard[];
};

// https://www.w3schools.com/js/js_array_sort.asp
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
export const sortTeams = (data: ITeamBoard[]) => {
  data.sort((teamA, teamB) => {
    if (teamA.totalPoints > teamB.totalPoints) return -1;
    if (teamA.totalPoints < teamB.totalPoints) return 1;
    if (teamA.totalVictories > teamB.totalVictories) return -1;
    if (teamA.totalVictories < teamB.totalVictories) return 1;
    if (teamA.goalsBalance > teamB.goalsBalance) return -1;
    if (teamA.goalsBalance < teamB.goalsBalance) return 1;
    if (teamA.goalsFavor > teamB.goalsFavor) return -1;
    if (teamA.goalsFavor < teamB.goalsFavor) return 1;
    if (teamA.goalsOwn > teamB.goalsOwn) return -1;
    if (teamA.goalsOwn < teamB.goalsOwn) return 1;
    return 0;
  });
  return data;
};
