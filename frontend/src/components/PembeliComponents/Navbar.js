import React, { useState } from 'react';
import { faBars, faCartShopping, faHome, faSearch, faTShirt, faX } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../css/PembeliStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserLogout, reset } from '../../features/UserAuth';
import { CariProduk } from '../../features/CariProduk';

const Navbar = ({ page }) => {
  const [aktif, setAktif] = useState(false);
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userAuth);
  const { produk } = useSelector((state) => state.cariProduk);

  const handleBar = () => {
    const secNav = document.querySelector('.navbar .secondSide nav');

    setAktif(!aktif);
    if (aktif) {
      secNav.classList.remove('aktif');
    } else {
      secNav.classList.add('aktif');
    }
  };

  window.onscroll = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 768) {
      const secondSide = document.querySelector('.navbar .secondSide nav');
      const fixedNav = secondSide.offsetTop;

      if (window.pageYOffset > fixedNav) {
        secondSide.classList.add('fixed');
      }
      if (window.pageYOffset <= 63) {
        secondSide.classList.remove('fixed');
      }
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(UserLogout());
    dispatch(reset());
    navigate('/');
  };

  const handleSearch = () => {
    const search = document.querySelector('.navbar .firstSide .search');
    search.classList.toggle('aktif');
  };

  const getCariProduk = async (e) => {
    e.preventDefault();
    try {
      console.log(keyword);
      if (keyword === '') {
        navigate('/produk');
      } else {
        dispatch(CariProduk(keyword));
        console.log(produk);
        navigate('/cariproduk');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="firstSide">
          <form onSubmit={getCariProduk} className="search">
            <input type="text" placeholder="Cari produk..." id="searchInput" onChange={(e) => setKeyword(e.target.value)} />
            <button type="submit" id="searchButton">
              <FontAwesomeIcon className="icon" icon={faSearch} />
            </button>
          </form>

          <FontAwesomeIcon className="icon searchMobile" icon={faSearch} onClick={handleSearch} />

          <div className="logo">
            <h4>
              Mode<span>Verse</span>
            </h4>
          </div>
          <div className="menu">
            <Link to="/profile" className={page === 'profile' ? 'aktif' : ''}>
              <FontAwesomeIcon className="icon" icon={faUser} />
            </Link>
            <Link to="/keranjang" className={page === 'keranjang' ? 'aktif' : ''}>
              <FontAwesomeIcon className="icon" icon={faCartShopping} />
            </Link>
          </div>
          <FontAwesomeIcon className={aktif ? 'iconBar iconX' : 'iconBar menubar'} icon={aktif ? faX : faBars} onClick={handleBar} />
        </div>
        <div className="secondSide">
          <nav>
            <li>
              <Link to="/" className={page === 'home' ? 'aktif' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/produk" className={page === 'produk' ? 'aktif' : ''}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/review" className={page === 'review' ? 'aktif' : ''}>
                Review
              </Link>
            </li>

            {user && (
              <li>
                <Link onClick={(e) => handleLogout(e)}>Logout</Link>
              </li>
            )}
          </nav>
        </div>
        <div className="thirdSide">
          <div className="menu">
            <Link to="/" className={page === 'home' ? 'aktif' : ''}>
              <FontAwesomeIcon className="icon" icon={faHome} />
            </Link>
            <Link to="/produk" className={page === 'produk' ? 'aktif' : ''}>
              <FontAwesomeIcon className="icon" icon={faTShirt} />
            </Link>
            <Link to="/keranjang" className={page === 'keranjang' ? 'aktif' : ''}>
              <FontAwesomeIcon className="icon" icon={faCartShopping} />
            </Link>
            <Link to="/profile" className={page === 'profile' ? 'aktif' : ''}>
              <FontAwesomeIcon className="icon" icon={faUser} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
