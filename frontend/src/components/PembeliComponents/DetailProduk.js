import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import '../css/PembeliStyle.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DetailProduk = () => {
  const [produk, setProduk] = useState({});
  const [jumlah, setJumlah] = useState('');
  const [pesan, setPesan] = useState('');
  const [produkKategori, setProdukKategori] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const getProdukById = async () => {
    const response = await axios.get(`http://localhost:5000/barang/${params.id}`);
    setProduk(response.data);
    setProdukKategori(response.data.kategori.nama);
  };

  const handleCart = async (e) => {
    e.preventDefault();
    try {
      const subtotal = jumlah * produk.harga;
      await axios.post('http://localhost:5000/keranjang', {
        jumlah: jumlah,
        subtotal: subtotal,
        barangId: produk.id,
        pesan: pesan,
      });
      navigate('/keranjang');
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    getProdukById();
  }, []);

  return (
    <div className="detailProduk">
      <div className="detailProdukKonten">
        <div className="boxDetail">
          <div className="gambar">
            <img src={produk.url} alt="produk" />
          </div>

          <div className="detail">
            <h2>{produk.nama}</h2>
            <p className="merek">Merek: {produk.merek}</p>
            <p className="harga">Rp {produk.harga}</p>
            <p className="kategori">Kategori: {produkKategori}</p>
            <div className="deskripsi">
              <h3>Produk Detail</h3>
              <p dangerouslySetInnerHTML={{ __html: produk.deskripsi }} />
            </div>

            <form onSubmit={handleCart}>
              <div className="formInput">
                <label htmlFor="jumlah">Jumlah :</label>
                <input type="number" id="jumlah" onChange={(e) => setJumlah(e.target.value)} value={jumlah} required />
              </div>
              <div className="formInput">
                <label htmlFor="pesan">Size :</label>
                <input type="text" id="pesan" placeholder="Masukkan ukuran contoh: XL" onChange={(e) => setPesan(e.target.value)} value={pesan} required />
              </div>
              <div className="formButton">
                <button>Tambah ke Keranjang</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailProduk;
