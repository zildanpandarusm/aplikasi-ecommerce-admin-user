import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Pengguna from './PenggunaModel.js';
import Barang from './BarangModel.js';

const { DataTypes } = Sequelize;

const Keranjang = db.define(
  'keranjang',
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
    barangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jumlah: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    subtotal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pesan: {
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

Pengguna.hasMany(Keranjang);
Keranjang.belongsTo(Pengguna, { foreignKey: 'penggunaId' });

Barang.hasMany(Keranjang);
Keranjang.belongsTo(Barang, { foreignKey: 'barangId' });

export default Keranjang;
