import Pengguna from '../models/PenggunaModel.js';
import fs from 'fs';
import path from 'path';
import argon2 from 'argon2';
import { Op } from 'sequelize';

export const getPengguna = async (req, res) => {
  try {
    const response = await Pengguna.findAll({
      attributes: ['id', 'uuid', 'nama', 'email', 'alamat', 'telepon', 'url'],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPenggunaLimaTerbaru = async (req, res) => {
  try {
    const response = await Pengguna.findAll({
      attributes: ['id', 'uuid', 'nama', 'email', 'alamat', 'telepon', 'url'],
      order: [['id', 'DESC']],
      limit: 8,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPenggunaById = async (req, res) => {
  try {
    const response = await Pengguna.findOne({
      attributes: ['id', 'uuid', 'nama', 'email', 'alamat', 'telepon', 'url'],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPengguna = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: 'Tidak Ada File Yang Diupload' });

  const { nama, email, password, confPassword, alamat, telepon } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({ msg: 'Password dan Konfirmasi Password tidak cocok' });
  }

  let hashPassword = await argon2.hash(password);

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
      const existingPengguna = await Pengguna.findOne({
        where: {
          email: email,
        },
      });

      if (existingPengguna) {
        return res.status(409).json({ msg: 'Email sudah terdaftar' });
      }

      await Pengguna.create({
        nama,
        email,
        password: hashPassword,
        alamat,
        telepon,
        foto: fileName,
        url: url,
      });
      res.status(201).json({ msg: 'Pengguna berhasil ditambahkan' });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

export const updatePengguna = async (req, res) => {
  const pengguna = await Pengguna.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!pengguna) return res.status(404).json({ msg: 'Data tidak ditemukan' });
  let fileName = '';
  if (req.files === null) {
    fileName = pengguna.foto;
  } else {
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;

    const allowedType = ['.png', '.jpeg', '.jpg'];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Gambar tidak valid' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'Ukuran gambar harus kurang dari 5mb' });

    // Menghapus image di folder public/images
    const filepath = `./public/images/${pengguna.foto}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

  const { nama, email, password, confPassword, alamat, telepon } = req.body;
  let hashPassword;
  if (password === '' || password === null) {
    hashPassword = pengguna.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== confPassword) return res.status(400).json({ msg: 'Password dan Confirm Password tidak cocok' });

  try {
    const existingPengguna = await Pengguna.findOne({
      where: {
        email: email,
        id: {
          [Op.ne]: pengguna.id,
        },
      },
    });

    if (existingPengguna) {
      return res.status(409).json({ msg: 'Email sudah terdaftar' });
    }

    await Pengguna.update(
      {
        nama,
        email,
        password: hashPassword,
        alamat,
        telepon,
        foto: fileName,
        url: url,
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

export const deletePengguna = async (req, res) => {
  const pengguna = await Pengguna.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!pengguna) return res.status(404).json({ msg: 'Pengguna tidak ditemukan' });
  try {
    await Pengguna.destroy({
      where: {
        id: pengguna.id,
      },
    });
    res.status(200).json({ msg: 'Pengguna dihapus' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
