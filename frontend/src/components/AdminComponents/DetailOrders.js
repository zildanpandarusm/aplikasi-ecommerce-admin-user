import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../css/AdminStyle.css';

const DetailOrders = () => {
  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [status, setStatus] = useState('');
  const [total, setTotal] = useState('');
  const [kurir, setKurir] = useState('');
  const [resi, setResi] = useState('');
  const [alamat, setAlamat] = useState('');
  const [idOrder, setIdOrder] = useState('');
  const [foto, setFoto] = useState('');
  const [orderItem, setOrderItem] = useState([]);
  const params = useParams();

  const getOrderItem = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orderitem/order/${idOrder}`);
      setOrderItem(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/${params.id}`);
      setNama(response.data.pengguna.nama);
      setTelepon(response.data.pengguna.telepon);
      setTanggal(response.data.tanggal);
      setStatus(response.data.status);
      setTotal(response.data.total_harga);
      setKurir(response.data.kurir);
      setResi(response.data.resi);
      setAlamat(response.data.alamat);
      setIdOrder(response.data.id);
      setFoto(response.data.pengguna.url);
    } catch (err) {
      console.log(err);
    }
  };

  if (idOrder) {
    getOrderItem();
  }

  useEffect(() => {
    getOrdersById();
  }, []);

  return (
    <div className="kontenDetail">
      <div className="judul">
        <h1>Detail Pesanan</h1>
        <p>Cek pelangganmu pesan apa saja?</p>
      </div>
      {status == 'dikirim' && (
        <Link to="/admin/orders/dikirim" className="back">
          <FontAwesomeIcon className="icon" icon={faArrowLeft} />
          Kembali
        </Link>
      )}
      {status == 'selesai' && (
        <Link to="/admin/orders/selesai" className="back">
          <FontAwesomeIcon className="icon" icon={faArrowLeft} />
          Kembali
        </Link>
      )}
      {(status == 'dikonfirmasi' || status == 'diterima') && (
        <Link to="/admin/orders" className="back">
          <FontAwesomeIcon className="icon" icon={faArrowLeft} />
          Kembali
        </Link>
      )}

      <div className="konten">
        <div className="detailOrder">
          <div className="card">
            <h4>Nama Pembeli :</h4>
            <p>{nama}</p>
            <h4>Telepon :</h4>
            <p>{telepon}</p>
          </div>
          <div className="card">
            <h4>Jam & Tanggal :</h4>
            <p>{tanggal}</p>
            <h4>Alamat Pengiriman:</h4>
            <p>{alamat}</p>
          </div>
          <div className="card">
            <h4>Status :</h4>
            <p>{status}</p>
            <h4>Total Harga :</h4>
            <p>{total}</p>
          </div>
          <div className="card">
            <h4>Kurir :</h4>
            <p>{kurir}</p>
            <h4>Resi :</h4>
            <p>{resi}</p>
          </div>
          <div className="card">
            <img src={foto} alt="" />
          </div>
        </div>
        <div className="detailOrderItem">
          <h2>Item Pesanan</h2>
          <div className="orderItem">
            {orderItem.map((item) => (
              <div className="box">
                <table>
                  <tr>
                    <th>Nama</th>
                    <td>: {item.barang.nama}</td>
                  </tr>
                  <tr>
                    <th>Merek </th>
                    <td>: {item.barang.merek}</td>
                  </tr>
                  <tr>
                    <th>Harga Satuan </th>
                    <td>: {item.barang.harga}</td>
                  </tr>
                  <tr>
                    <th>Jumlah Pembelian</th>
                    <td>: {item.jumlah}</td>
                  </tr>
                  <tr>
                    <th>Subtotal Harga</th>
                    <td>: {item.subtotal}</td>
                  </tr>
                  <tr>
                    <th>Pesan</th>
                    <td>: {item.pesan}</td>
                  </tr>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrders;
