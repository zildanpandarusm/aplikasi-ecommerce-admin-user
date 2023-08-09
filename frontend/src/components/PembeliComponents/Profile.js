import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  // const [pengguna, setPengguna] = useState({});
  const { user } = useSelector((state) => state.userAuth);

  // const getPenggunaById = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/pengguna/${params.id}`);
  //     setNama(response.data.nama);
  //     setEmail(response.data.email);
  //     setAlamat(response.data.alamat);
  //     setTelepon(response.data.telepon);
  //     setFile(response.data.url);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getPenggunaById();
  // }, []);
  return (
    <div className="profile">
      <div className="profileKonten">
        <h1>Profile</h1>
        <div className="box">
          <div className="gambar">
            <img src={user.url} alt="profile" />
          </div>
          <div className="detailProfile">
            <div className="card">
              <h4>Nama :</h4>
              <p>{user.nama}</p>
            </div>
            <div className="card">
              <h4>Email :</h4>
              <p>{user.email}</p>
            </div>
            <div className="card">
              <h4>Telepon :</h4>
              <p>{user.telepon}</p>
            </div>
            <div className="card">
              <h4>Alamat :</h4>
              <p>{user.alamat}</p>
            </div>
            <div className="card">
              <Link className="button" to={`/editpengguna/${user.uuid}`}>
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        <Link className="pesananSaya" to="/riwayatpesanan">
          <FontAwesomeIcon className="icon" icon={faFileLines} />
          <p>--Lihat Pesanan Saya--</p>
          <FontAwesomeIcon className="icon" icon={faChevronRight} />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
