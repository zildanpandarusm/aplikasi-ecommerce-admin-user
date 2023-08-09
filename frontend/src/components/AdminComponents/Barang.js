import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenSquare, faTrashAlt, faCamera, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Barang = () => {
  const [idBarang, setIdBarang] = useState('');
  const [nama, setNama] = useState('');
  const [merek, setMerek] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');
  const [total_penjualan, setTotalPenjualan] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [file, setFile] = useState('');
  const [kategoriId, setKategoriId] = useState('');
  const [msg, setMsg] = useState('');
  const [aktif, setAktif] = useState(false);
  const [edit, setEdit] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [barang, setBarang] = useState([]);
  const [kategori, setKategori] = useState([]);
  const navigate = useNavigate();

  const resetVariable = () => {
    setNama('');
    setMerek('');
    setHarga('');
    setStok('');
    setTotalPenjualan('');
    setDeskripsi('');
    setFile('');
    setKategoriId('');
    setMsg('');
  };

  const getBarang = async () => {
    try {
      const response = await axios.get('http://localhost:5000/barang');
      setBarang(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBarangById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/barang/${id}`);
      setNama(response.data.nama);
      setMerek(response.data.merek);
      setHarga(response.data.harga);
      setTotalPenjualan(response.data.total_penjualan);
      setDeskripsi(response.data.deskripsi);
      setStok(response.data.stok);
      setFile(response.data.url);
      setKategoriId(response.data.kategoriId);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`http://localhost:5000/barang/${idBarang}`);
      setIdBarang('');
      setAktif(false);
      getBarang();
    } catch (error) {
      console.log(error);
    }
  };

  const getKategori = async () => {
    try {
      const response = await axios.get('http://localhost:5000/kategori');
      setKategori(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (!edit) {
      try {
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('merek', merek);
        formData.append('harga', harga);
        formData.append('deskripsi', deskripsi);
        formData.append('total_penjualan', total_penjualan);
        formData.append('stok', stok);
        formData.append('foto', file);
        formData.append('kategoriId', kategoriId);
        await axios.post('http://localhost:5000/barang', formData);
        setAktif(false);
        getBarang();
        resetVariable();
      } catch (error) {
        setMsg(error.response.data.msg);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('merek', merek);
        formData.append('harga', harga);
        formData.append('deskripsi', deskripsi);
        formData.append('total_penjualan', total_penjualan);
        formData.append('stok', stok);
        formData.append('foto', file);
        formData.append('kategoriId', kategoriId);
        await axios.patch(`http://localhost:5000/barang/${idBarang}`, formData);
        setAktif(false);
        resetVariable();
        setEdit(false);
        getBarang();
      } catch (error) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const detailOrders = (id) => {
    navigate(`/admin/detailbarang/${id}`);
  };

  const showModal = () => {
    setAktif(true);
    getKategori();
    if (!hapus) {
      setHapus(false);
    }
  };

  const closeModal = () => {
    setAktif(false);
    setEdit(false);
    setHapus(false);
    resetVariable();
  };

  const showEditModal = (id) => {
    setEdit(true);
    showModal();
    setIdBarang(id);
    getBarangById(id);
  };

  const hapusModal = (id) => {
    showModal();
    setHapus(true);
    setIdBarang(id);
  };

  const handleModal = () => {
    const modal = document.querySelector('.modal');
    const box = document.querySelector('.modal .box');
    const boxTwoSide = document.querySelector('.modal .box.twoSide');

    if (aktif) {
      modal.classList.add('show');
    } else {
      modal.classList.remove('show');
    }

    if (hapus) {
      box.style.marginTop = '-25rem';
      boxTwoSide.style.width = '25rem';
    } else {
      box.style.marginTop = '0';
      boxTwoSide.style.width = '36rem';
    }
  };

  useEffect(() => {
    getBarang();
  }, []);

  useEffect(() => {
    handleModal();
  }, [handleModal]);

  const data = useMemo(
    () =>
      barang.map((item) => ({
        uuid: item.uuid,
        nama: item.nama,
        merek: item.merek,
        harga: item.harga,
        stok: item.stok,
        total_penjualan: item.total_penjualan,
      })),
    [barang]
  );
  const columns = useMemo(
    () => [
      {
        Header: 'Nomor',
        accessor: 'uuid',
        Cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
      {
        Header: 'Nama',
        accessor: 'nama',
      },
      {
        Header: 'Merek',
        accessor: 'merek',
      },
      {
        Header: 'Harga',
        accessor: 'harga',
      },
      {
        Header: 'Stok',
        accessor: 'stok',
      },
      {
        Header: 'Total Penjualan',
        accessor: 'total_penjualan',
      },
      {
        Header: 'Aksi',
        Cell: ({ row }) => (
          <div className="aksi">
            <button onClick={() => showEditModal(row.original.uuid)}>
              <FontAwesomeIcon icon={faPenSquare} />
            </button>
            <button onClick={() => detailOrders(row.original.uuid)}>
              <FontAwesomeIcon icon={faFileLines} />
            </button>
            <button onClick={() => hapusModal(row.original.uuid)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <div>
      <div className="judul">
        <h1>Barang</h1>
        <p>Atur ketersediaan barangmu!</p>
      </div>
      <div className="konten">
        <div className="tambah">
          <div className="table-controls">
            <label htmlFor="cari">Search : </label>
            <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari..." id="cari" />
          </div>
          <button onClick={showModal}>
            <FontAwesomeIcon className="icon" icon={faPlus} />
            Tambah
          </button>
        </div>

        <table border="1" className="tbl" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span className="sorted">{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pgInfo">
          <span>
            Halaman{' '}
            <strong>
              {pageIndex + 1} dari {pageOptions.length}
            </strong>{' '}
          </span>
          <div className="pagination">
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="modal">
        <div className="overlay">
          <div className="box twoSide">
            {!hapus ? (
              <>
                <div className="formInput">{edit ? <h1>Edit Data</h1> : <h1>Tambah Data</h1>}</div>
                <form onSubmit={handleForm}>
                  <div className="leftSide">
                    <div className="formInput">
                      <label htmlFor="nama">
                        Nama <span className="wajib">*</span>
                      </label>
                      <input type="text" id="nama" placeholder="Masukkan nama" onChange={(e) => setNama(e.target.value)} value={nama} required />
                    </div>
                    <div className="formInput">
                      <label htmlFor="merek">
                        Merek <span className="wajib">*</span>
                      </label>
                      <input type="text" placeholder="Masukkan merek" id="merek" onChange={(e) => setMerek(e.target.value)} value={merek} required />
                    </div>
                    <div className="formInput">
                      <label htmlFor="harga">
                        Harga <span className="wajib">*</span>
                      </label>
                      <input type="text" placeholder="Masukkan harga" id="harga" onChange={(e) => setHarga(e.target.value)} value={harga} required />
                    </div>
                    <div className="formInput">
                      <label htmlFor="stok">
                        Stok <span className="wajib">*</span>
                      </label>
                      <input type="text" placeholder="Masukkan stok" id="stok" onChange={(e) => setStok(e.target.value)} value={stok} required />
                    </div>
                    <div className="formInput">
                      <label htmlFor="foto">
                        Foto <span className="wajib">*</span>
                        <FontAwesomeIcon className="icon" icon={faCamera} />
                      </label>
                      <input type="file" id="foto" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className="formInput">
                      <label htmlFor="kategori">
                        Kategori <span className="wajib">*</span>
                      </label>
                      <select id="kategori" onChange={(e) => setKategoriId(e.target.value)} value={kategoriId}>
                        <option>Pilih Kategori</option>
                        {kategori.map((item) => (
                          <option value={item.id.toString()} key={item.uuid}>
                            {item.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="formButton">
                      {edit ? <button type="submit">Simpan</button> : <button type="submit">Tambah</button>}
                      <button type="button" onClick={closeModal}>
                        Batal
                      </button>
                    </div>
                  </div>
                  <div className="rightSide">
                    <div className="formInput">
                      <label htmlFor="totPenjualan">
                        Total Penjualan <span className="wajib">*</span>
                      </label>
                      <input type="text" id="totPenjualan" placeholder="Masukkan total penjualan" onChange={(e) => setTotalPenjualan(e.target.value)} value={total_penjualan} required />
                    </div>
                    <div className="formInput">
                      <label htmlFor="deskripsi">
                        Deskripsi <span className="wajib">*</span>
                      </label>
                      <ReactQuill className="deskBox" theme="snow" value={deskripsi} onChange={setDeskripsi} />
                    </div>
                  </div>
                </form>
                {msg && <p className="errMsg">{msg}</p>}
              </>
            ) : (
              <div className="hapusModal">
                <h2 className="yakin">Apakah Anda yakin ingin menghapus?</h2>
                <div className="hapusButton">
                  <button type="button" onClick={deleteData}>
                    Hapus
                  </button>
                  <button type="button" onClick={closeModal}>
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barang;
