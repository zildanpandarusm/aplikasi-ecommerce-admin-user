import Orders from '../models/OrdersModel.js';
import Pengguna from '../models/PenggunaModel.js';
import { Op } from 'sequelize';

export const getOrders = async (req, res) => {
  try {
    const response = await Orders.findAll({
      where: {
        status: {
          [Op.or]: ['diterima', 'dikonfirmasi'],
        },
      },
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'telepon'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getOrdersBerlangsung = async (req, res) => {
  try {
    const response = await Orders.findAll({
      where: {
        status: {
          [Op.ne]: ['selesai'],
        },
        penggunaId: req.penggunaId,
      },
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'telepon'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getOrdersUserSelesai = async (req, res) => {
  try {
    const response = await Orders.findAll({
      where: {
        status: 'selesai',
        penggunaId: req.penggunaId,
      },
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'telepon'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getOrdersDikirim = async (req, res) => {
  try {
    const response = await Orders.findAll({
      where: {
        status: 'dikirim',
      },
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'telepon'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getOrdersSelesai = async (req, res) => {
  try {
    const response = await Orders.findAll({
      where: {
        status: 'selesai',
      },
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'telepon'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getOrdersById = async (req, res) => {
  try {
    const response = await Orders.findOne({
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'telepon', 'url'],
        },
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createOrders = async (req, res) => {
  try {
    if (!req.penggunaId) return res.status(401).json({ msg: 'Anda belum login' });

    const { total_harga, alamat } = req.body;

    let tanggal = new Date();
    let tahun = tanggal.getFullYear();
    let bulan = tanggal.getMonth();
    let tanggalHari = tanggal.getDate();
    let jam = tanggal.getHours();
    let menit = tanggal.getMinutes();
    let detik = tanggal.getSeconds();
    let tanggalPesan = `${jam}:${menit}:${detik}, ${tanggalHari}-${bulan + 1}-${tahun}`;

    let status = 'diterima';
    const createOrder = await Orders.create({
      penggunaId: req.penggunaId,
      tanggal: tanggalPesan,
      status,
      total_harga,
      alamat,
      kurir: 'Belum diatur',
      resi: 'Belum diatur',
    });
    res.status(201).json({ orderId: createOrder.id, uuid: createOrder.uuid });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateOrders = async (req, res) => {
  try {
    const order = await Orders.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!order) return res.status(404).json({ msg: 'Data orders tidak ditemukan' });

    const { status, kurir, resi } = req.body;
    await Orders.update(
      {
        status,
        kurir,
        resi,
      },
      {
        where: {
          id: order.id,
        },
      }
    );
    res.status(201).json({ msg: 'Berhasil mengedit data' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteOrders = async (req, res) => {
  const order = await Orders.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!order) return res.status(404).json({ msg: 'Data order tidak ditemukan' });
  try {
    await Orders.destroy({
      where: {
        id: order.id,
      },
    });
    res.status(200).json({ msg: 'Order berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
