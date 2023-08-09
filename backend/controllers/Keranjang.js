import Barang from '../models/BarangModel.js';
import Keranjang from '../models/KeranjangModel.js';
import Pengguna from '../models/PenggunaModel.js';
import { Op } from 'sequelize';

export const getKeranjang = async (req, res) => {
  try {
    const response = await Keranjang.findAll({
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'alamat'],
        },
        {
          model: Barang,
        },
      ],
      where: {
        penggunaId: req.penggunaId,
      },
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKeranjangById = async (req, res) => {
  try {
    const response = await Keranjang.findOne({
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'alamat'],
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

export const createKeranjang = async (req, res) => {
  try {
    if (!req.penggunaId) return res.status(401).json({ msg: 'Anda belum login' });
    const response = await Keranjang.findAll({
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'alamat'],
        },
        {
          model: Barang,
          attributes: ['nama'],
        },
      ],
      where: {
        penggunaId: req.penggunaId,
      },
      order: [['id', 'DESC']],
    });

    const { jumlah, subtotal, barangId, pesan } = req.body;

    let barangSudahAda = false;
    for (let i = 0; i < response.length; i++) {
      if (response[i].barangId == barangId) {
        barangSudahAda = true;
      }
    }

    if (barangSudahAda === true) {
      response.forEach(async (res) => {
        if (res.barangId == barangId) {
          await Keranjang.destroy({
            where: {
              [Op.and]: [{ barangId: barangId }, { penggunaId: req.penggunaId }],
            },
          });
        }
      });
    }

    await Keranjang.create({
      penggunaId: req.penggunaId,
      barangId,
      jumlah,
      subtotal,
      pesan,
    });
    res.status(201).json({ msg: 'Berhasil menambah data' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateKeranjang = async (req, res) => {
  try {
    if (!req.penggunaId) return res.status(401).json({ msg: 'Anda belum login' });
    const keranjang = await Keranjang.findOne({
      where: {
        [Op.and]: [{ uuid: req.params.id }, { penggunaId: req.penggunaId }],
      },
    });
    if (!keranjang) return res.status(404).json({ msg: 'Data keranjang tidak ditemukan' });

    const { jumlah, subtotal, barangId } = req.body;
    await Keranjang.update(
      {
        penggunaId: req.penggunaId,
        barangId,
        jumlah,
        subtotal,
      },
      {
        where: {
          [Op.and]: [{ uuid: req.params.id }, { penggunaId: req.penggunaId }],
        },
      }
    );
    res.status(201).json({ msg: 'Berhasil mengedit data' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteKeranjang = async (req, res) => {
  const keranjang = await Keranjang.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!keranjang) return res.status(404).json({ msg: 'Data keranjang tidak ditemukan' });
  try {
    await Keranjang.destroy({
      where: {
        [Op.and]: [{ id: keranjang.id }, { penggunaId: req.penggunaId }],
      },
    });
    res.status(200).json({ msg: 'Keranjang berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
