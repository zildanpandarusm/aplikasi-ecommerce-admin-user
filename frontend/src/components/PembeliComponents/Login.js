import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { LoginUser, reset } from '../../features/UserAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/profile');
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const UserAuth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="loginPembeli">
      <div className="loginPembeliKonten">
        <div className="box">
          <form onSubmit={UserAuth}>
            <h2>Login</h2>
            <div className="formInput">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Masukkan email..." onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Masukkan password..." onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="formButton">
              <button>Login</button>
              <p>
                Belum memiliki akun?
                <Link to="/register" className="tombol">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
