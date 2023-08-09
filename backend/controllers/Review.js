import Review from '../models/ReviewModel.js';
import Pengguna from '../models/PenggunaModel.js';
import { Op } from 'sequelize';

export const getReview = async (req, res) => {
  try {
    const response = await Review.findAll({
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'alamat', 'url'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getReviewTerbaru = async (req, res) => {
  try {
    const response = await Review.findAll({
      include: [
        {
          model: Pengguna,
          attributes: ['nama', 'alamat', 'url'],
        },
      ],
      order: [['id', 'DESC']],
      limit: 6,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const response = await Review.findOne({
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

export const createReview = async (req, res) => {
  try {
    if (!req.penggunaId) return res.status(401).json({ msg: 'Anda belum login' });

    const { review } = req.body;
    await Review.create({
      penggunaId: req.penggunaId,
      review,
    });
    res.status(201).json({ msg: 'Berhasil menambah data' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    if (!req.penggunaId) return res.status(401).json({ msg: 'Anda belum login' });
    const reviews = await Review.findOne({
      where: {
        [Op.and]: [{ uuid: req.params.id }, { penggunaId: req.penggunaId }],
      },
    });
    if (!reviews) return res.status(404).json({ msg: 'Data review tidak ditemukan' });

    const { review } = req.body;
    await Review.update(
      {
        penggunaId: req.penggunaId,
        review,
      },
      {
        where: {
          id: reviews.id,
        },
      }
    );
    res.status(201).json({ msg: 'Berhasil mengedit data' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const reviews = await Review.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!reviews) return res.status(404).json({ msg: 'Data review tidak ditemukan' });
  try {
    await Review.destroy({
      where: {
        id: reviews.id,
      },
    });
    res.status(200).json({ msg: 'Review berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
