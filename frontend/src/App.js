import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/AdminPages/Dashboard';
import Barang from './pages/AdminPages/BarangPage';
import Kategori from './pages/AdminPages/KategoriPage';
import Orders from './pages/AdminPages/OrdersPage';
import OrderItem from './pages/AdminPages/OrderItemPage';
import Pengguna from './pages/AdminPages/PenggunaPage';
import Review from './pages/AdminPages/ReviewPage';
import Saran from './pages/AdminPages/SaranPage';
import Admin from './pages/AdminPages/AdminPage';
import Login from './pages/AdminPages/LoginPage';
import DetailOrders from './pages/AdminPages/DetailOrdersPage';
import DetailBarang from './pages/AdminPages/DetailBarangPage';
import OrdersDikirim from './pages/AdminPages/OrdersDikirimPage';
import OrdersSelesai from './pages/AdminPages/OrdersSelesaiPage';
import HomePage from './pages/PembeliPages/HomePage';
import DetailProduk from './pages/PembeliPages/DetailProdukPage';
import Keranjang from './pages/PembeliPages/KeranjangPage';
import Pesanan from './pages/PembeliPages/PesananPage';
import LoginPembeli from './pages/PembeliPages/LoginPage';
import RegisterPembeli from './pages/PembeliPages/RegisterPage';
import Profile from './pages/PembeliPages/ProfilePage';
import Produk from './pages/PembeliPages/ProdukPage';
import ReviewPembeli from './pages/PembeliPages/ReviewPage';
import RiwayatPesanan from './pages/PembeliPages/RiwayatPesananPage';
import EditAkun from './pages/PembeliPages/EditAkunPage';
import CariProduk from './pages/PembeliPages/CariProdukPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/barang" element={<Barang />} />
          <Route path="/admin/detailbarang/:id" element={<DetailBarang />} />
          <Route path="/admin/kategori" element={<Kategori />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/orders/dikirim" element={<OrdersDikirim />} />
          <Route path="/admin/orders/selesai" element={<OrdersSelesai />} />
          <Route path="/admin/detailorders/:id" element={<DetailOrders />} />
          <Route path="/admin/orderitem" element={<OrderItem />} />
          <Route path="/admin/pengguna" element={<Pengguna />} />
          <Route path="/admin/review" element={<Review />} />
          <Route path="/admin/saran" element={<Saran />} />
          <Route path="/admin/admin" element={<Admin />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/detailproduk/:id" element={<DetailProduk />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/pesanan/:id" element={<Pesanan />} />
          <Route path="/login" element={<LoginPembeli />} />
          <Route path="/register" element={<RegisterPembeli />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/cariproduk" element={<CariProduk />} />
          <Route path="/review" element={<ReviewPembeli />} />
          <Route path="/riwayatpesanan" element={<RiwayatPesanan />} />
          <Route path="/editpengguna/:id" element={<EditAkun />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
