import Saran from '../models/SaranModel.js';
import Pengguna from '../models/PenggunaModel.js';

export const getSaran = async (req, res) => {
  try {
    const response = await Saran.findAll({
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'alamat'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSaranTerbaru = async (req, res) => {
  try {
    const response = await Saran.findAll({
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'alamat', 'url'],
        },
      ],
      order: [['id', 'DESC']],
      limit: 5,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSaran = async (req, res) => {
  try {
    if (!req.penggunaId) return res.status(401).json({ msg: 'Anda belum login' });

    const { saran } = req.body;
    await Saran.create({
      penggunaId: req.penggunaId,
      saran,
    });
    res.status(201).json({ msg: 'Berhasil menambah data' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteSaran = async (req, res) => {
  const saran = await Saran.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!saran) return res.status(404).json({ msg: 'Data saran tidak ditemukan' });
  try {
    await Saran.destroy({
      where: {
        id: saran.id,
      },
    });
    res.status(200).json({ msg: 'Saran berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
