import React, { useState } from 'react';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');
  const [file, setFile] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const resetVariable = () => {
    setNama('');
    setEmail('');
    setAlamat('');
    setTelepon('');
    setFile('');
    setPassword('');
    setConfPassword('');
  };

  const handleRegister = async (e) => {
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
      await axios.post(`http://localhost:5000/pengguna`, formData);
      setMsg('Anda berhasil register, Silahkan login!');
      resetVariable();
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  return (
    <div className="registerPembeli">
      <div className="registerPembeliKonten">
        <div className="box">
          <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <div className="formInput">
              <label htmlFor="nama">
                Nama <span className="required">*</span>
              </label>
              <input type="text" id="nama" placeholder="Masukkan nama..." onChange={(e) => setNama(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input type="email" id="email" placeholder="Masukkan email..." onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <input type="password" id="password" placeholder="Masukkan password..." onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="confPassword">
                Konfirmasi Password <span className="required">*</span>
              </label>
              <input type="password" id="confPassword" placeholder="Masukkan konfirmasi password..." onChange={(e) => setConfPassword(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="alamat">
                Alamat <span className="required">*</span>
              </label>
              <input type="text" id="alamat" placeholder="Masukkan alamat..." onChange={(e) => setAlamat(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="telepon">
                Telepon <span className="required">*</span>
              </label>
              <input type="text" id="telepon" placeholder="Masukkan telepon..." onChange={(e) => setTelepon(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="foto">
                Foto <span className="required">*</span>
                <span>(max: 5mb, persegi)</span>
              </label>
              <input type="file" id="foto" placeholder="Masukkan foto..." onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <div className="formButton">
              <button type="submit">Register</button>
              <p>
                Sudah memiliki akun?
                <Link to="/login" className="tombol">
                  Login
                </Link>
              </p>
              <p className="msgPembeli">{msg}</p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
