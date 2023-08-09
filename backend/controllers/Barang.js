import Barang from '../models/BarangModel.js';
import Kategori from '../models/KategoriModel.js';
import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';

export const getBarang = async (req, res) => {
  try {
    const response = await Barang.findAll({
      include: [
        {
          model: Kategori,
          attributes: ['nama'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCariBarang = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    const response = await Barang.findAll({
      include: [
        {
          model: Kategori,
          attributes: ['nama'],
        },
      ],
      where: {
        nama: {
          [Op.substring]: searchQuery,
        },
      },
      order: [['id', 'DESC']],
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const getBarangBeberapa = async (req, res) => {
  try {
    const response = await Barang.findAll({
      include: [
        {
          model: Kategori,
          attributes: ['nama'],
        },
      ],
      order: [['id', 'DESC']],
      limit: 8,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBarangPenjualanTerbanyak = async (req, res) => {
  try {
    const response = await Barang.findAll({
      include: [
        {
          model: Kategori,
          attributes: ['nama'],
        },
      ],
      order: [['total_penjualan', 'DESC']],
      limit: 4,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBarangById = async (req, res) => {
  try {
    const response = await Barang.findOne({
      include: [
        {
          model: Kategori,
          attributes: ['nama'],
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

export const getBarangByKategoriId = async (req, res) => {
  try {
    const response = await Barang.findAll({
      include: [
        {
          model: Kategori,
          attributes: ['nama'],
        },
      ],
      where: {
        kategoriId: req.params.ktgrid,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBarang = (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: 'Tidak Ada File Yang Diupload' });
  const { nama, merek, harga, stok, deskripsi, total_penjualan, kategoriId } = req.body;

  const file = req.files.foto;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  const allowedType = ['.png', '.jpeg', '.jpg'];
  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'File Gambar Tidak Valid' });
  if (fileSize > 5000000) return res.status(422).json({ msg: 'Ukuran gambar harus kurang dari 5mb' });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Barang.create({
        nama,
        merek,
        harga,
        stok,
        deskripsi,
        total_penjualan,
        foto: fileName,
        url: url,
        kategoriId,
      });
      res.status(201).json({ msg: 'Barang berhasil ditambahkan' });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

export const updateBarang = async (req, res) => {
  const barang = await Barang.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!barang) return res.status(404).json({ msg: 'Data tidak ditemukan' });
  let fileName = '';
  if (req.files === null) {
    fileName = barang.foto;
  } else {
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;

    const allowedType = ['.png', '.jpeg', '.jpg'];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Gambar tidak valid' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'Ukuran gambar harus kurang dari 5mb' });

    // Menghapus image di folder public/images
    const filepath = `./public/images/${barang.foto}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  const { nama, merek, harga, stok, deskripsi, total_penjualan, kategoriId } = req.body;
  try {
    await Barang.update(
      {
        nama,
        merek,
        harga,
        stok,
        deskripsi,
        total_penjualan,
        foto: fileName,
        url: url,
        kategoriId,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: 'Barang berhasil diperbarui' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteBarang = async (req, res) => {
  const barang = await Barang.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!barang) return res.status(404).json({ msg: 'Barang tidak ditemukan' });
  try {
    await Barang.destroy({
      where: {
        id: barang.id,
      },
    });
    res.status(200).json({ msg: 'Barang dihapus' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
