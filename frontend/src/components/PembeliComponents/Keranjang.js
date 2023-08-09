import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Keranjang = () => {
  const [keranjang, setKeranjang] = useState([]);
  const [barangId, setBarangId] = useState('');
  const [uuid, setUuid] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [harga, setHarga] = useState('');
  const [alamat, setAlamat] = useState('');
  const navigate = useNavigate();

  let totalAkhir = 0;

  const handleTotalHarga = (price, jml) => {
    const subTotalHarga = price * jml;
    totalAkhir = totalAkhir + subTotalHarga;
  };

  const getKeranjang = async () => {
    const response = await axios.get('http://localhost:5000/keranjang');
    setKeranjang(response.data);
  };

  const updateKeranjang = async () => {
    if (uuid !== '') {
      console.log(uuid);
      const subtotal = jumlah * harga;
      await axios.patch(`http://localhost:5000/keranjang/${uuid}`, {
        barangId,
        jumlah,
        subtotal,
      });
      getKeranjang();
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/keranjang/${id}`);
    getKeranjang();
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/orders', {
        alamat,
        total_harga: totalAkhir,
      });

      console.log(response.data.orderId);
      keranjang.forEach(async (item) => {
        await axios.post('http://localhost:5000/orderitem', {
          orderId: response.data.orderId,
          barangId: item.barangId,
          jumlah: item.jumlah,
          subtotal: item.subtotal,
          pesan: item.pesan,
        });
      });

      keranjang.forEach(async (item) => {
        await axios.delete(`http://localhost:5000/keranjang/${item.uuid}`);
      });

      navigate(`/pesanan/${response.data.uuid}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKeranjang();
  }, []);

  useEffect(() => {
    updateKeranjang();
  });

  return (
    <div className="keranjang">
      <div className="keranjangKonten">
        <h1>Keranjang</h1>
        <div className="box">
          <div className="firstBox">
            <table cellSpacing="0" border="1">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Nama</th>
                  <th>Jumlah</th>
                  <th>Subtotal Harga</th>
                  <th>Hapus</th>
                </tr>
              </thead>
              <tbody>
                {keranjang.length == 0 ? (
                  <tr>
                    <td colSpan="5">
                      <p className="msgKetersediaan">Keranjang belum ada</p>
                    </td>
                  </tr>
                ) : (
                  keranjang.map((item) => (
                    <tr>
                      <td>
                        <img src={item.barang.url} alt="produk" />
                      </td>
                      <td>{item.barang.nama}</td>
                      <td>
                        <form>
                          <input
                            type="number"
                            value={barangId == item.barangId ? jumlah : item.jumlah}
                            onChange={(e) => {
                              setHarga(item.barang.harga);
                              setBarangId(item.barangId);
                              setUuid(item.uuid);
                              setJumlah(e.target.value);
                            }}
                          />
                        </form>
                      </td>
                      <td>{item.subtotal}</td>
                      <td>
                        <FontAwesomeIcon className="icon" icon={faTrash} onClick={() => handleDelete(item.uuid)} />
                      </td>
                      {handleTotalHarga(item.barang.harga, item.jumlah)}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="secondBox">
            <div className="total">
              <h2>Total</h2>
              <p>Total Produk : {keranjang.length}</p>
              <p>Total Harga </p>
              <p className="harga">Rp {totalAkhir}</p>
            </div>

            <form onSubmit={handleForm}>
              <h2>Pesan Sekarang</h2>
              <div className="formInput">
                <p>Pembayaran dilakukan secara transfer melalui rekening</p>
                <div className="bank">
                  <p>BRI</p>
                  <p>BNI</p>
                  <p>Mandiri</p>
                  <p>BCA</p>
                </div>
              </div>
              <div className="formInput">
                <label htmlFor="Alamat">Alamat Pengiriman</label>
                <textarea id="alamat" placeholder="Masukkan alamat..." onChange={(e) => setAlamat(e.target.value)}></textarea>
              </div>
              <div className="formButton">
                <button type="submit">Pesan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Keranjang;
