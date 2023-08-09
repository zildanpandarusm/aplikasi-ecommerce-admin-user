import React, { useEffect, useState } from 'react';
import '../css/AdminStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faUsers, faBoxesPacking } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const HalamanUtama = () => {
  const [jmlBarang, setJmlBarang] = useState('');
  const [jmlOrders, setJmlOrders] = useState('');
  const [jmlPengguna, setJmlPengguna] = useState('');
  const [penggunaTerbaru, setPenggunaTerbaru] = useState([]);
  const [reviewTerbaru, setReviewTerbaru] = useState([]);
  const [saranTerbaru, setSaranTerbaru] = useState([]);

  const getJumlahBarang = async () => {
    const response = await axios.get('http://localhost:5000/barang');
    setJmlBarang(response.data.length);
  };
  const getJumlahOrders = async () => {
    const response = await axios.get('http://localhost:5000/orders');
    setJmlOrders(response.data.length);
  };
  const getJumlahPengguna = async () => {
    const response = await axios.get('http://localhost:5000/pengguna');
    setJmlPengguna(response.data.length);
  };

  const getPenggunaTerbaru = async () => {
    const response = await axios.get('http://localhost:5000/pengguna/terbaru');
    setPenggunaTerbaru(response.data);
  };

  const getReviewTerbaru = async () => {
    const response = await axios.get('http://localhost:5000/review/terbaru');
    setReviewTerbaru(response.data);
  };

  const getSaranTerbaru = async () => {
    const response = await axios.get('http://localhost:5000/saran/terbaru');
    setSaranTerbaru(response.data);
  };

  useEffect(() => {
    getJumlahBarang();
    getJumlahOrders();
    getJumlahPengguna();
    getPenggunaTerbaru();
    getReviewTerbaru();
    getSaranTerbaru();
  }, []);

  return (
    <div className="dashboard">
      <div className="judul">
        <h1>Dashboard</h1>
        <p>Hai, Selamat datang di sistem admin!</p>
      </div>
      <div className="konten">
        <div className="leftKonten">
          <div className="barisKotak">
            <div className="box">
              <FontAwesomeIcon className="icon" icon={faBoxOpen} />
              <div className="keterangan">
                <h2>{jmlBarang}</h2>
                <p>Barang</p>
              </div>
            </div>
            <div className="box">
              <FontAwesomeIcon className="icon" icon={faBoxesPacking} />
              <div className="keterangan">
                <h2>{jmlOrders}</h2>
                <p>Orders</p>
              </div>
            </div>
            <div className="box">
              <FontAwesomeIcon className="icon" icon={faUsers} />
              <div className="keterangan">
                <h2>{jmlPengguna}</h2>
                <p>Pengguna</p>
              </div>
            </div>
          </div>
          <div className="reviewSaran">
            <div className="review">
              <h2>Review</h2>
              {reviewTerbaru.map((item) => (
                <div className="card">
                  <img src={item.pengguna.url} alt={item.nama} />
                  <p>"{item.review}"</p>
                </div>
              ))}
            </div>
            <div className="saran">
              <h2>Saran</h2>
              {saranTerbaru.map((item) => (
                <div className="card">
                  <img src={item.pengguna.url} alt={item.nama} />
                  <p>{item.saran}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rightKonten">
          <h2>Pengguna Terbaru</h2>
          {penggunaTerbaru.map((item) => (
            <div className="card">
              <img src={item.url} alt="profil" />
              <div className="profil">
                <p>{item.nama}</p>
                <p>{item.telepon}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HalamanUtama;
