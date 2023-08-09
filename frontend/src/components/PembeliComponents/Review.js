import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { faComments, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UserMe } from '../../features/UserAuth';

const Review = () => {
  const [review, setReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [msg, setMsg] = useState('');
  const { user, message } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const getReview = async () => {
    const response = await axios.get('http://localhost:5000/review');
    setReviewList(response.data);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (user) {
      await axios.post('http://localhost:5000/review', {
        review: review,
      });
      setReview('');
    } else {
      setMsg(message);
    }
  };
  console.log(review);

  useEffect(() => {
    getReview();
  });

  useEffect(() => {
    dispatch(UserMe());
  }, []);

  return (
    <div className="reviewPembeli">
      <div className="reviewPembeliKonten">
        <h1>Review</h1>
        <div className="boxReview">
          <form onSubmit={handleForm}>
            <label htmlFor="review">
              <FontAwesomeIcon className="icon" icon={faComments} />
              Review
            </label>
            <textarea id="review" placeholder="Masukkan review..." onChange={(e) => setReview(e.target.value)} value={review}></textarea>
            <button type="submit">Kirim</button>
            <p className="msgPembeli">{msg}</p>
          </form>
        </div>
        <h2>
          <FontAwesomeIcon className="icon" icon={faComments} />
          Daftar Review
        </h2>
        <div className="cardList">
          {reviewList.map((item) => (
            <div className="card">
              <p className="msg">
                <FontAwesomeIcon className="icon" icon={faQuoteLeft} />
                {item.review}
                <FontAwesomeIcon className="icon" icon={faQuoteRight} />
              </p>
              <div className="profil">
                <img src={item.pengguna.url} alt="profil" />
                <p>{item.pengguna.nama}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Review;
