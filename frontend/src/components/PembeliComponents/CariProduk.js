import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { faBoxOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchProduk = () => {
  const [cariProduk, setCariProduk] = useState([]);
  const { produk } = useSelector((state) => state.cariProduk);

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

  useEffect(() => {
    if (produk !== null) {
      setCariProduk(produk);
    }
  });

  console.log(cariProduk);

  useEffect(() => {
    handleBox();
  }, [handleBox]);

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
        </div>
        {cariProduk ? (
          <div className="daftarProduk">
            {cariProduk.length === 0 ? (
              <p className="msgKetersediaan">Produk tidak tersedia</p>
            ) : (
              cariProduk.map((item) => (
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
        ) : (
          ''
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchProduk;
