import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Pengguna from './PenggunaModel.js';

const { DataTypes } = Sequelize;

const Orders = db.define(
  'orders',
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
    tanggal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    total_harga: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kurir: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Pengguna.hasMany(Orders);
Orders.belongsTo(Pengguna, { foreignKey: 'penggunaId' });

export default Orders;
