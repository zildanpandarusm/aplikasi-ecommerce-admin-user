import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import { LoginAdmin, reset } from '../../features/AdminAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, isError, isSuccess, isLoading, message } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (admin || isSuccess) {
      navigate('/admin');
    }
    dispatch(reset());
  }, [admin, isSuccess, dispatch, navigate]);

  const AdminAuth = (e) => {
    e.preventDefault();
    dispatch(LoginAdmin({ email, password }));
  };

  return (
    <div className="login">
      <div className="box">
        <h1>LOGIN</h1>
        <form onSubmit={AdminAuth}>
          <div className="formInput">
            <label for="email">Email</label>
            <input type="email" placeholder="Masukkan email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="formInput">
            <label for="password">Password</label>
            <input type="password" placeholder="Masukkan password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="formInput">{isLoading ? <button disabled>Loading...</button> : <button type="submit">Login</button>}</div>
          {isError && <h3 className="msg">{message}</h3>}
        </form>
      </div>
    </div>
  );
};

export default Login;
