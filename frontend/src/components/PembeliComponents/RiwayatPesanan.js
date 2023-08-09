import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RiwayatPesanan = () => {
  const [orderBerlangsung, setOrderBerlangsung] = useState([]);
  const [orderSelesai, setOrderSelesai] = useState([]);

  const getOrderBerlangsung = async () => {
    const response = await axios.get('http://localhost:5000/orders/berlangsung');
    setOrderBerlangsung(response.data);
    console.log(response.data);
  };

  const getOrderSelesai = async () => {
    const response = await axios.get('http://localhost:5000/orders/user/selesai');
    setOrderSelesai(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getOrderBerlangsung();
    getOrderSelesai();
  }, []);
  return (
    <div className="riwayatPesanan">
      <div className="riwayatPesananKonten">
        <h1>Riwayat Pesanan</h1>
        <div className="berlangsung">
          <h2>Sedang Berlangsung</h2>
          <div className="box">
            {orderBerlangsung.map((item) => (
              <Link className="card" to={`/pesanan/${item.uuid}`}>
                <div className="tanggal">
                  <h3>
                    <FontAwesomeIcon className="icon" icon={faCalendarDays} />
                    Tanggal
                  </h3>
                  <p>{item.tanggal}</p>
                </div>
                <div className="detail">
                  <p>Rp {item.total_harga}</p>
                  <p>{item.status}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="selesai">
          <h2>Selesai</h2>
          <div className="box">
            {orderSelesai.map((item) => (
              <Link className="card" to={`/pesanan/${item.uuid}`}>
                <div className="tanggal">
                  <h3>
                    <FontAwesomeIcon className="icon" icon={faCalendarDays} />
                    Tanggal
                  </h3>
                  <p>{item.tanggal}</p>
                </div>
                <div className="detail">
                  <p>Rp {item.total_harga}</p>
                  <p>{item.status}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RiwayatPesanan;
