import React from 'react';
import Navbar from '../../components/PembeliComponents/Navbar';
import Review from '../../components/PembeliComponents/Review';

const ReviewPage = () => {
  return (
    <div>
      <Navbar page="review" />
      <Review />
    </div>
  );
};

export default ReviewPage;
