import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

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
    modelName: 'match',
    timestamps: false,
  },
);

TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeam', as: 'teamAway' });

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchModel;
