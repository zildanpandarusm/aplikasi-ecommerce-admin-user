import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pesanan = () => {
  const [nama, setNama] = useState('');
  const [order, setOrder] = useState({});
  const [idOrder, setIdOrder] = useState('');
  const [orderItem, setOrderItem] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getOrderItem = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orderitem/order/${idOrder}`);
      setOrderItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/${params.id}`);
      setOrder(response.data);
      setNama(response.data.pengguna.nama);
      setIdOrder(response.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleButton = async () => {
    await axios.delete(`http://localhost:5000/orders/${params.id}`);
    navigate('/riwayatpesanan');
  };

  if (idOrder) {
    getOrderItem();
  }

  useEffect(() => {
    getOrdersById();
  }, []);

  return (
    <div className="pesanan">
      <div className="pesananKonten">
        <h2>Detail Riwayat Pesanan</h2>
        <div className="box">
          <div className="firstBox">
            <div className="card">
              <p>Silahkan melakukan pembayaran ke rekening berikut.</p>
              <p className="rekening">008359941227584</p>
            </div>
            <div className="card">
              <h4>Tanggal Pemesanan : </h4>
              <p>{order.tanggal}</p>
            </div>
            <div className="card">
              <h4>Nama : </h4>
              <p>{nama}</p>
            </div>
            <div className="card">
              <h4>Alamat :</h4>
              <p>{order.alamat}</p>
            </div>
            <div className="card">
              <h4>Total Harga :</h4>
              <p>Rp {order.total_harga}</p>
            </div>
            <div className="card">
              <h4>Status :</h4>
              <p>{order.status}</p>
            </div>
            <div className="card">
              <h4>Kurir :</h4>
              <p>{order.kurir}</p>
            </div>
            <div className="card">
              <h4>No.Resi :</h4>
              <p>{order.resi}</p>
            </div>
          </div>
          <div className="secondBox">
            {orderItem.map((item) => (
              <div className="detail">
                <img src={item.barang.url} alt="item" />
                <div className="keterangan">
                  <p>Nama : {item.barang.nama}</p>
                  <p>Jumlah : {item.jumlah}</p>
                  <p>Subtotal harga : {item.subtotal}</p>
                  <p>Pesan/Ukuran : {item.pesan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {order.status == 'diterima' && <button onClick={() => handleButton()}>Batal</button>}
      </div>
      <Footer />
    </div>
  );
};

export default Pesanan;
