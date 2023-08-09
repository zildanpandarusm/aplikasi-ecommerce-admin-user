import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EditAkun = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');
  const [file, setFile] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  const { user } = useSelector((state) => state.userAuth);

  const resetVariable = () => {
    setNama('');
    setEmail('');
    setAlamat('');
    setTelepon('');
    setFile('');
    setPassword('');
    setConfPassword('');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nama', nama);
      formData.append('email', email);
      formData.append('alamat', alamat);
      formData.append('telepon', telepon);
      formData.append('foto', file);
      formData.append('password', password);
      formData.append('confPassword', confPassword);
      console.log(formData);
      await axios.patch(`http://localhost:5000/pengguna/${params.id}`, formData);
      resetVariable();
      navigate('/profile');
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };
  console.log(file);

  useEffect(() => {
    if (user) {
      setNama(user.nama);
      setEmail(user.email);
      setAlamat(user.alamat);
      setTelepon(user.telepon);
      setFile(user.url);
    }
  }, []);

  return (
    <div className="registerPembeli">
      <div className="registerPembeliKonten">
        <div className="box">
          {user && user.nama ? (
            <form onSubmit={handleEdit}>
              <h2>Edit Data</h2>
              <div className="formInput">
                <label htmlFor="nama">
                  Nama <span className="required">*</span>
                </label>
                <input type="text" id="nama" placeholder="Masukkan nama..." onChange={(e) => setNama(e.target.value)} value={nama} required />
              </div>
              <div className="formInput">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input type="email" id="email" placeholder="Masukkan email..." onChange={(e) => setEmail(e.target.value)} value={email} required />
              </div>
              <div className="formInput">
                <label htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <input type="password" id="password" placeholder="Masukkan password..." onChange={(e) => setPassword(e.target.value)} value={password} required />
              </div>
              <div className="formInput">
                <label htmlFor="confPassword">
                  Konfirmasi Password <span className="required">*</span>
                </label>
                <input type="password" id="confPassword" placeholder="Masukkan konfirmasi password..." onChange={(e) => setConfPassword(e.target.value)} value={confPassword} required />
              </div>
              <div className="formInput">
                <label htmlFor="alamat">
                  Alamat <span className="required">*</span>
                </label>
                <input type="text" id="alamat" placeholder="Masukkan alamat..." onChange={(e) => setAlamat(e.target.value)} required value={alamat} />
              </div>
              <div className="formInput">
                <label htmlFor="telepon">
                  Telepon <span className="required">*</span>
                </label>
                <input type="text" id="telepon" placeholder="Masukkan telepon..." onChange={(e) => setTelepon(e.target.value)} value={telepon} required />
              </div>
              <div className="formInput">
                <label htmlFor="foto">
                  Foto <span className="required">*</span>
                  <span>(max: 5mb, persegi)</span>
                </label>
                <input type="file" id="foto" placeholder="Masukkan foto..." onChange={(e) => setFile(e.target.files[0])} /> <img src={file} alt="foto" width="30px" height="30px" />
              </div>
              <div className="formButton">
                <button type="submit">Update</button>
                <p className="msgPembeli">{msg}</p>
              </div>
            </form>
          ) : (
            ''
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditAkun;
