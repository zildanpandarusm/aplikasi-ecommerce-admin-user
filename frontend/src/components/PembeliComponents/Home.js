import React, { useEffect, useState } from 'react';
import { faEnvelope, faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../css/PembeliStyle.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UserMe } from '../../features/UserAuth';

const Home = () => {
  const [produkTerbaru, setProdukTerbaru] = useState([]);
  const [produkPopuler, setProdukPopuler] = useState([]);
  const [pesan, setPesan] = useState('');
  const [msg, setMsg] = useState('');
  const { user, message } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  AOS.init({
    once: true,
  });

  const handleCard = () => {
    const cardGambar = document.querySelectorAll('.productHome .card .cardGambar');
    const cardIcon = document.querySelectorAll('.productHome .card .cardGambar .cardIcon');
    const cardGambarNewProduct = document.querySelectorAll('.newProductHome .newProductHomeKonten .card .cardGambar');

    cardGambar.forEach((card, i) => {
      card.addEventListener('mouseover', () => {
        cardIcon[i].classList.add('aktif');
      });

      card.addEventListener('mouseleave', () => {
        cardIcon[i].classList.remove('aktif');
      });
    });

    cardGambarNewProduct.forEach((card) => {
      card.addEventListener('mouseover', () => {
        card.classList.add('aktif');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('aktif');
      });
    });
  };

  const produkterbaru = async () => {
    const response = await axios.get('http://localhost:5000/barangbeberapa');
    setProdukTerbaru(response.data);
  };

  const getProdukTerpopuler = async () => {
    const response = await axios.get('http://localhost:5000/barangpenjualanterbanyak');
    setProdukPopuler(response.data);
  };

  const handlePesan = async (e) => {
    e.preventDefault();
    if (user) {
      await axios.post('http://localhost:5000/saran', {
        saran: pesan,
      });
      setPesan('');
    } else {
      setMsg(message);
    }
  };

  useEffect(() => {
    handleCard();
  });

  console.log(user);

  useEffect(() => {
    produkterbaru();
    getProdukTerpopuler();
    dispatch(UserMe());
  }, []);
  return (
    <div className="home">
      <div className="heroHome">
        <div className="firstSide" data-aos="fade-right">
          <div className="konten">
            <h3>Atur Style Harianmu</h3>
            <h1>Urban Elegance Trends</h1>
            <Link to="/produk">
              <button>Shop Now</button>
            </Link>
          </div>
        </div>
        <div className="secondSide" data-aos="fade-up-left">
          <img src="img/gmbr1.png" alt="banner" />
        </div>
      </div>
      <div className="productHome">
        <h2>
          Best Sellers <span>Product</span>
        </h2>
        <p>Produk terbaik yang kami tawarkan untuk Anda</p>
        <div className="productHomeKonten">
          {produkPopuler.map((item) => (
            <div className="card" data-aos="flip-right">
              <div className="cardGambar">
                <img src={item.url} alt="product" />
                <div className="cardIcon">
                  <FontAwesomeIcon className="icon" icon={faEye} />
                  <FontAwesomeIcon className="icon" icon={faShoppingCart} />
                </div>
              </div>
              <div className="keterangan">
                <p>{item.merek}</p>
                <Link className="namaProduct">
                  <h3>{item.nama}</h3>
                </Link>
                <p className="harga">Rp {item.harga}</p>
                <p>{item.total_penjualan} terjual</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="newProductHome">
        <h2>
          <span>New</span> Products
        </h2>
        <p>Produk terbaru hadir dengan tren terkini</p>
        <div className="newProductHomeKonten">
          {produkTerbaru.map((item) => (
            <div className="card" data-aos="zoom-in-up">
              <Link className="cardGambar" to={`/detailproduk/${item.uuid}`}>
                <img src={item.url} alt="product" />
                <div className="overlay">
                  <p>Lihat</p>
                </div>
              </Link>
              <div className="bottomSide">
                <div className="keterangan">
                  <Link className="namaProduct" to={`/detailproduk/${item.uuid}`}>
                    <h3>{item.nama}</h3>
                  </Link>
                  <p>{item.merek}</p>
                  <p className="harga">Rp {item.harga}</p>
                </div>
                <Link to={`/detailproduk/${item.uuid}`}>
                  <FontAwesomeIcon className="icon" icon={faShoppingCart} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="message">
        <div className="pesanKonten">
          <h2>Message</h2>
          <p>Sampaikan pesanmu kepada kami</p>
          <div className="box" data-aos="zoom-out">
            <div className="gambar">
              <img src="img/gmbr2.jpg" alt="Gambar" />
            </div>
            <form onSubmit={handlePesan}>
              <label htmlFor="pesan">
                <FontAwesomeIcon className="icon" icon={faEnvelope} /> Pesan
              </label>
              <textarea id="pesan" placeholder="Masukkan pesan..." onChange={(e) => setPesan(e.target.value)} value={pesan}></textarea>
              <button type="submit">Kirim</button>
              <p className="msgPembeli">{msg}</p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
