import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdminLogout, reset } from '../../features/AdminAuth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  faHouse,
  faMoneyBillWave,
  faUser,
  faRightFromBracket,
  faBoxOpen,
  faShirt,
  faBoxesPacking,
  faHeartCircleCheck,
  faEnvelope,
  faUsers,
  faTruck,
  faClipboardList,
  faChevronDown,
  faChevronRight,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import '../css/AdminStyle.css';

const Sidebar = () => {
  const [aktif, setAktif] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmenu = () => {
    const submenu = document.querySelector('aside .submenu');
    const parentSubmenu = document.querySelector('.parentSubmenu');

    parentSubmenu.addEventListener('click', function () {
      if (!submenu.classList.contains('aktif')) {
        submenu.classList.add('aktif');
        setAktif(true);
      } else {
        submenu.classList.remove('aktif');
        setAktif(false);
      }
    });
  };

  const handleLogout = () => {
    dispatch(AdminLogout());
    dispatch(reset());
    navigate('/admin/login');
  };

  useEffect(() => {
    handleSubmenu();
  }, [handleSubmenu]);

  return (
    <aside>
      <div className="logo">
        <img src="http://localhost:3000/logo192.png" alt="logo" />
      </div>
      <ul>
        <Link to="/admin" className="menu">
          <FontAwesomeIcon className="icon" icon={faHouse} />
          <p>Dashboard</p>
        </Link>
        <Link to="/admin/barang" className="menu">
          <FontAwesomeIcon className="icon" icon={faBoxOpen} />
          <p>Barang</p>
        </Link>
        <Link to="/admin/kategori" className="menu">
          <FontAwesomeIcon className="icon" icon={faShirt} />
          <p>Kategori</p>
        </Link>
        <Link className="menu parentSubmenu">
          <FontAwesomeIcon className="icon" icon={faBoxesPacking} />
          <p>Orders</p>
          {aktif ? <FontAwesomeIcon className="iconP" icon={faChevronDown} /> : <FontAwesomeIcon className="iconP" icon={faChevronRight} />}
        </Link>
        <div className="submenu">
          <Link to="/admin/orders" className="menu">
            <FontAwesomeIcon className="icon" icon={faClipboard} />
            <p>Pesanan Terbaru</p>
          </Link>
          <Link to="/admin/orders/dikirim" className="menu">
            <FontAwesomeIcon className="icon" icon={faTruck} />
            <p>Pesanan Dikirim</p>
          </Link>
          <Link to="/admin/orders/selesai" className="menu">
            <FontAwesomeIcon className="icon" icon={faClipboardList} />
            <p>Pesanan Selesai</p>
          </Link>
        </div>

        <Link to="/admin/orderitem" className="menu">
          <FontAwesomeIcon className="icon" icon={faMoneyBillWave} />
          <p>Order Item</p>
        </Link>
        <Link to="/admin/pengguna" className="menu">
          <FontAwesomeIcon className="icon" icon={faUsers} />
          <p>Pengguna</p>
        </Link>
        <Link to="/admin/review" className="menu">
          <FontAwesomeIcon className="icon" icon={faHeartCircleCheck} />
          <p>Review</p>
        </Link>
        <Link to="/admin/saran" className="menu">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <p>Saran</p>
        </Link>
        <Link to="/admin/admin" className="menu">
          <FontAwesomeIcon className="icon" icon={faUser} />
          <p>Admin</p>
        </Link>
      </ul>
      <div className="logoutSidebar">
        <button onClick={handleLogout}>
          <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
