import Pengguna from '../models/PenggunaModel.js';

export const VerifyPengguna = async (req, res, next) => {
  if (!req.session.penggunaId) {
    return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
  }

  const pengguna = await Pengguna.findOne({
    where: {
      uuid: req.session.penggunaId,
    },
  });

  if (!pengguna) return res.status(404).json({ msg: 'Data pengguna tidak ditemukan' });
  req.penggunaId = pengguna.id;
  next();
};
