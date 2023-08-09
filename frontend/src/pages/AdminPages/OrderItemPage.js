import React, { useEffect } from 'react';
import Layout from './Layout';
import OrderItem from '../../components/AdminComponents/OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AdminMe } from '../../features/AdminAuth';

const OrderItemPage = () => {
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
          <OrderItem />
        </Layout>
      )}
    </>
  );
};

export default OrderItemPage;
