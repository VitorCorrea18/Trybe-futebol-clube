import { DataTypes, Model } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

TeamModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
});

export default TeamModel;
