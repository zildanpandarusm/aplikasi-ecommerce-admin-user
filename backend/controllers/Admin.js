import Admin from '../models/AdminModel.js';
import argon2 from 'argon2';
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';

export const getAdmin = async (req, res) => {
  try {
    const response = await Admin.findAll({
      attributes: ['id', 'uuid', 'nama', 'email', 'telepon', 'url'],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      attributes: ['id', 'uuid', 'nama', 'email', 'telepon', 'url'],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createAdmin = async (req, res) => {
  if (req.files == null) {
    return res.status(400).json({ msg: 'Tidak ada file yang dikirimkan' });
  }

  const { nama, email, password, confPassword, telepon } = req.body;

  if (password !== confPassword) {
    return res.status(400).json({ msg: 'Password dan Konfirmasi Password tidak cocok' });
  }

  const hashPassword = await argon2.hash(password);
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
      const existingAdmin = await Admin.findOne({
        where: {
          email: email,
        },
      });

      if (existingAdmin) {
        return res.status(409).json({ msg: 'Email sudah terdaftar' });
      }

      await Admin.create({
        nama,
        email,
        password: hashPassword,
        telepon,
        foto: fileName,
        url: url,
      });
      res.status(201).json({ msg: 'Admin berhasil dibuat' });
    } catch (error) {
      res.status(400).json({ msg: 'Gagal ditambahkan' });
    }
  });
};

export const updateAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!admin) return res.status(404).json({ msg: 'Data tidak ditemukan' });

  let fileName = '';
  if (req.files === null) {
    fileName = admin.foto;
  } else {
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;

    const allowedType = ['.png', '.jpeg', '.jpg'];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Gambar tidak valid' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'Ukuran gambar harus kurang dari 5mb' });

    // Menghapus image di folder public/images
    const filepath = `./public/images/${admin.foto}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

  const { nama, email, password, confPassword, telepon } = req.body;
  let hashPassword;
  if (password === '' || password === null) {
    hashPassword = admin.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword) return res.status(400).json({ msg: 'Password dan Confirm Password tidak cocok' });
  try {
    const existingAdmin = await Admin.findOne({
      where: {
        email: email,
        id: {
          [Op.ne]: admin.id,
        },
      },
    });

    if (existingAdmin) {
      return res.status(409).json({ msg: 'Email sudah terdaftar' });
    }
    await Admin.update(
      {
        nama,
        email,
        password: hashPassword,
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
    res.status(200).json({ msg: 'Admin berhasil diperbarui' });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!admin) return res.status(404).json({ msg: 'Admin tidak ditemukan' });
  try {
    await Admin.destroy({
      where: {
        id: admin.id,
      },
    });
    res.status(200).json({ msg: 'Admin dihapus' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
