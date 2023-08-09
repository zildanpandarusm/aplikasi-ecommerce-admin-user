import Kategori from '../models/KategoriModel.js';

export const getKategori = async (req, res) => {
  try {
    let response = await Kategori.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKategoriById = async (req, res) => {
  try {
    let response = await Kategori.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createKategori = async (req, res) => {
  try {
    const { nama } = req.body;
    await Kategori.create({
      nama,
    });
    res.status(201).json({ msg: 'Berhasil menambahkan kategori' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kategori) return res.status(404).json({ msg: 'Data kategori tidak ditemukan' });

    const { nama } = req.body;
    await Kategori.update(
      {
        nama,
      },
      {
        where: {
          id: kategori.id,
        },
      }
    );
    res.status(200).json({ msg: 'Berhasil memperbarui kategori' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kategori) return res.status(404).json({ msg: 'Data kategori tidak ditemukan' });

    await Kategori.destroy({
      where: {
        id: kategori.id,
      },
    });
    res.status(200).json({ msg: 'Kategori berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
