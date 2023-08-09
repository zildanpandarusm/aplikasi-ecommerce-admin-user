import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../css/AdminStyle.css';

const DetailBarang = () => {
  const [nama, setNama] = useState('');
  const [merek, setMerek] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');
  const [total_penjualan, setTotalPenjualan] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [file, setFile] = useState('');
  const [kategori, setKategori] = useState('');
  const params = useParams();

  const getBarangById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/barang/${params.id}`);
      setNama(response.data.nama);
      setMerek(response.data.merek);
      setHarga(response.data.harga);
      setTotalPenjualan(response.data.total_penjualan);
      setDeskripsi(response.data.deskripsi);
      setStok(response.data.stok);
      setFile(response.data.url);
      setKategori(response.data.kategori.nama);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBarangById();
  }, []);

  return (
    <div className="kontenDetail">
      <div className="judul">
        <h1>Detail Barang</h1>
        <p>Cek detail barangmu?</p>
      </div>
      <Link to="/admin/barang" className="back">
        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
        Kembali
      </Link>
      <div className="konten">
        <h1>{nama}</h1>
        <img src={file} alt="Gambar Barang" className="gmbBarang" />
        <div className="detailBarang">
          <table border="1" cellSpacing="0">
            <tr>
              <th>Detail Barang</th>
              <th>Keterangan</th>
            </tr>
            <tr>
              <th>Nama Barang</th>
              <td>{nama}</td>
            </tr>
            <tr>
              <th>Merek</th>
              <td>{merek}</td>
            </tr>
            <tr>
              <th>Harga</th>
              <td>{harga}</td>
            </tr>
            <tr>
              <th>Stok</th>
              <td>{stok}</td>
            </tr>
            <tr>
              <th>Total Penjualan</th>
              <td>{total_penjualan}</td>
            </tr>
            <tr>
              <th>Kategori</th>
              <td>{kategori}</td>
            </tr>
            <tr>
              <th>Deskripsi</th>
              <td dangerouslySetInnerHTML={{ __html: deskripsi }} />
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailBarang;
