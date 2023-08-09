import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Pengguna from './PenggunaModel.js';

const { DataTypes } = Sequelize;

const Review = db.define(
  'review',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    penggunaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Pengguna.hasMany(Review);
Review.belongsTo(Pengguna, { foreignKey: 'penggunaId' });

export default Review;
