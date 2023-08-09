import React, { useEffect } from 'react';
import Layout from './Layout';
import Review from '../../components/AdminComponents/Review';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AdminMe } from '../../features/AdminAuth';

const ReviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, isError } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    dispatch(AdminMe());
    if (isError) {
      navigate('/admin/login');
    }
  }, [dispatch, isError, navigate]);
  return (
    <>
      {admin && (
        <Layout>
          <Review />
        </Layout>
      )}
    </>
  );
};

export default ReviewPage;
