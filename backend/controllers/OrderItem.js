import OrderItem from '../models/OrderItemModel.js';
import Barang from '../models/BarangModel.js';

export const getOrderItem = async (req, res) => {
  try {
    const response = await OrderItem.findAll({
      include: [
        {
          model: Barang,
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getOrderItemByOrdersId = async (req, res) => {
  try {
    const response = await OrderItem.findAll({
      include: [
        {
          model: Barang,
        },
      ],
      where: {
        orderId: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getOrderItemById = async (req, res) => {
  try {
    const response = await OrderItem.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createOrderItem = async (req, res) => {
  try {
    if (!req.penggunaId) return res.status(401).json({ msg: 'Anda belum login' });

    const { orderId, barangId, jumlah, subtotal, pesan } = req.body;
    await OrderItem.create({
      orderId,
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

export const deleteOrderItem = async (req, res) => {
  const orderItem = await OrderItem.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!orderItem) return res.status(404).json({ msg: 'Data order item tidak ditemukan' });
  try {
    await OrderItem.destroy({
      where: {
        id: orderItem.id,
      },
    });
    res.status(200).json({ msg: 'Order item berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
