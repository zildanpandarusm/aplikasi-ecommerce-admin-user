import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Barang from './BarangModel.js';
import Orders from './OrdersModel.js';

const { DataTypes } = Sequelize;

const OrderItem = db.define(
  'order_item',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    orderId: {
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
      type: DataTypes.TEXT,
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

Orders.hasMany(OrderItem);
OrderItem.belongsTo(Orders, { foreignKey: 'orderId' });

Barang.hasMany(OrderItem);
OrderItem.belongsTo(Barang, { foreignKey: 'barangId' });

export default OrderItem;
