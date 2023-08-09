import React from 'react';
import Navbar from '../../components/PembeliComponents/Navbar';
import Produk from '../../components/PembeliComponents/Produk';

const ProdukPage = () => {
  return (
    <div>
      <Navbar page="produk" />
      <Produk />
    </div>
  );
};

export default ProdukPage;
