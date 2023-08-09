import Admin from '../models/AdminModel.js';
import argon2 from 'argon2';

export const LoginAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!admin) return res.status(404).json({ msg: 'Admin tidak ditemukan' });
  const match = await argon2.verify(admin.password, req.body.password);
  if (!match) return res.status(400).json({ msg: 'Wrong Password' });
  req.session.adminId = admin.uuid;
  const uuid = admin.uuid;
  const nama = admin.nama;
  const email = admin.email;
  const telepon = admin.telepon;
  const url = admin.url;
  res.status(200).json({ uuid, nama, email, telepon, url });
};

export const MeAdmin = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
  }
  const admin = await Admin.findOne({
    attributes: ['uuid', 'nama', 'email', 'telepon', 'url'],
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: 'Admin tidak ditemukan' });
  res.status(200).json(admin);
};

export const logoutAdmin = (req, res) => {
  // Menghapus sesi 'adminId'
  delete req.session.adminId;

  // Berikan respon setelah sesi dihapus
  res.status(200).json({ msg: 'Anda telah logout' });
};
