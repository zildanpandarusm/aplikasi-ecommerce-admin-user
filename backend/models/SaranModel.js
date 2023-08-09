import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Pengguna from './PenggunaModel.js';

const { DataTypes } = Sequelize;

const Saran = db.define(
  'saran',
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
    saran: {
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

Pengguna.hasMany(Saran);
Saran.belongsTo(Pengguna, { foreignKey: 'penggunaId' });

export default Saran;
