import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class MatchModel extends Model {
  id: number;
  homeTeam:number;
  homeTeamGoals:number;
  awayTeam:number;
  awayTeamGoals:number;
  inProgress:boolean;
}

MatchModel.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeam: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    homeTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    awayTeam: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    awayTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matchModel',
    timestamps: false,
  },
);

Team.hasMany(MatchModel, { foreignKey: 'homeTeam', as: 'home_team' });
Team.hasMany(MatchModel, { foreignKey: 'awayTeam', as: 'away_team' });

MatchModel.belongsTo(Team, { foreignKey: 'homeTeam', as: 'home_team' });
MatchModel.belongsTo(Team, { foreignKey: 'awayTeam', as: 'away_team' });

export default MatchModel;
