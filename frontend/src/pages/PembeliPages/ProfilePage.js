import React, { useEffect } from 'react';
import Navbar from '../../components/PembeliComponents/Navbar';
import Profile from '../../components/PembeliComponents/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { UserMe } from '../../features/UserAuth';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(UserMe());
    if (isError) {
      navigate('/login');
    }
  }, [dispatch, isError, navigate]);

  return (
    <>
      {user && (
        <div>
          <Navbar page="profile" />
          <Profile />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
