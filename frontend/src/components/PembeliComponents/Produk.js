import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { faBoxOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Produk = () => {
  const [produk, setProduk] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [kategoriId, setKategoriId] = useState('all');

  const handleBox = () => {
    const boxGambar = document.querySelectorAll('.produkPembeliKonten .daftarProduk .box .gambar');

    boxGambar.forEach((card) => {
      card.addEventListener('mouseover', () => {
        card.classList.add('aktif');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('aktif');
      });
    });
  };

  const getProduk = async () => {
    try {
      if (kategoriId === 'all') {
        const response = await axios.get('http://localhost:5000/barang');
        setProduk(response.data);
      } else {
        const response = await axios.get(`http://localhost:5000/barang/kategori/${kategoriId}`);
        setProduk(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getKategori = async () => {
    const response = await axios.get('http://localhost:5000/kategori');
    setKategori(response.data);
  };

  useEffect(() => {
    getKategori();
  }, []);

  console.log(kategoriId);
  console.log(produk);

  useEffect(() => {
    handleBox();
    getProduk();
  }, [getProduk, handleBox]);

  return (
    <div className="produkPembeli">
      <div className="produkPembeliKonten">
        <div className="judulProduk">
          <img src="http://localhost:3000/img/bannerProduk.jpg" alt="banner" />
          <div className="overlay">
            <h1>Daftar Produk</h1>
          </div>
        </div>
        <div className="subjudul">
          <h2>
            <FontAwesomeIcon className="icon" icon={faBoxOpen} />
            Produk yang tersedia
          </h2>
          <form action="">
            <select id="kategori" onChange={(e) => setKategoriId(e.target.value)} value={kategoriId}>
              <option value="all">Semua</option>
              {kategori.map((item) => (
                <option value={item.id}>{item.nama}</option>
              ))}
            </select>
          </form>
        </div>

        <div className="daftarProduk">
          {produk.length === 0 ? (
            <p className="msgKetersediaan">Produk tidak tersedia</p>
          ) : (
            produk.map((item) => (
              <div className="box">
                <div className="gambar">
                  <img src={item.url} alt="produk" />
                  <Link className="overlay" to={`/detailproduk/${item.uuid}`}>
                    <p className="lihat">Lihat</p>
                  </Link>
                </div>
                <div className="keterangan">
                  <div className="detail">
                    <Link className="h2" to={`/detailproduk/${item.uuid}`}>
                      <h2>{item.nama}</h2>
                    </Link>
                    <p className="merek">{item.merek}</p>
                    <p className="harga">{item.harga}</p>
                  </div>
                  <div className="cardIcon">
                    <Link to={`/detailproduk/${item.uuid}`}>
                      <FontAwesomeIcon className="icon" icon={faShoppingCart} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Produk;
