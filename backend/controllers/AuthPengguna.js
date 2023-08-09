import Pengguna from '../models/PenggunaModel.js';
import argon2 from 'argon2';

export const LoginPengguna = async (req, res) => {
  const pengguna = await Pengguna.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!pengguna) return res.status(404).json({ msg: 'Pengguna tidak ditemukan' });
  const match = await argon2.verify(pengguna.password, req.body.password);
  if (!match) return res.status(400).json({ msg: 'Wrong Password' });
  req.session.penggunaId = pengguna.uuid;
  const uuid = pengguna.uuid;
  const nama = pengguna.nama;
  const email = pengguna.email;
  const alamat = pengguna.alamat;
  const telepon = pengguna.telepon;
  const url = pengguna.url;
  res.status(200).json({ uuid, nama, email, alamat, telepon, url });
};

export const MePengguna = async (req, res) => {
  if (!req.session.penggunaId) {
    return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
  }
  const pengguna = await Pengguna.findOne({
    attributes: ['uuid', 'nama', 'email', 'alamat', 'telepon', 'url'],
    where: {
      uuid: req.session.penggunaId,
    },
  });
  if (!pengguna) return res.status(404).json({ msg: 'Pengguna tidak ditemukan' });
  res.status(200).json(pengguna);
};

export const logoutPengguna = (req, res) => {
  // Menghapus sesi 'penggunaId'
  delete req.session.penggunaId;

  // Berikan respon setelah sesi dihapus
  res.status(200).json({ msg: 'Anda telah logout' });
};
