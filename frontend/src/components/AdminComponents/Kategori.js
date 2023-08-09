import React, { useState, useEffect, useMemo } from 'react';
import '../css/AdminStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenSquare, faTrashAlt, faL } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import axios from 'axios';

const Kategori = () => {
  const [nama, setNama] = useState('');
  const [idKategori, setIdKategori] = useState('');
  const [kategori, setKategori] = useState([]);
  const [aktif, setAktif] = useState(false);
  const [edit, setEdit] = useState(false);
  const [hapus, setHapus] = useState(false);

  const getKategori = async () => {
    try {
      const response = await axios.get('http://localhost:5000/kategori');
      setKategori(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getKategoriById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/kategori/${id}`);
      setNama(response.data.nama);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`http://localhost:5000/kategori/${idKategori}`);
      setIdKategori('');
      setAktif(false);
      getKategori();
      setHapus(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setAktif(true);
    if (!hapus) {
      setHapus(false);
    }
  };

  const closeModal = () => {
    setAktif(false);
    setEdit(false);
    setHapus(false);
    setNama('');
  };

  const showEditModal = (id) => {
    setEdit(true);
    showModal();
    getKategoriById(id);
    setIdKategori(id);
  };

  const hapusModal = (id) => {
    showModal();
    setHapus(true);
    setIdKategori(id);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (!edit) {
      try {
        await axios.post('http://localhost:5000/kategori', {
          nama: nama,
        });
        setAktif(false);
        setNama('');
        getKategori();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.patch(`http://localhost:5000/kategori/${idKategori}`, {
          nama: nama,
        });
        setAktif(false);
        setNama('');
        setEdit(false);
        getKategori();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleModal = () => {
    const modal = document.querySelector('.modal');
    const box = document.querySelector('.modal .box');

    if (aktif) {
      modal.classList.add('show');
    } else {
      modal.classList.remove('show');
    }

    if (hapus) {
      box.style.marginTop = '-25rem';
    } else {
      box.style.marginTop = '0';
    }
  };

  useEffect(() => {
    getKategori();
  }, []);

  useEffect(() => {
    handleModal();
  }, [handleModal]);

  const data = useMemo(
    () =>
      kategori.map((item) => ({
        uuid: item.uuid,
        nama: item.nama,
      })),
    [kategori]
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
        Header: 'Aksi',
        Cell: ({ row }) => (
          <div className="aksi">
            <button onClick={() => showEditModal(row.original.uuid)}>
              <FontAwesomeIcon icon={faPenSquare} />
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
        <h1>Kategori</h1>
        <p>Atur kategori penjualanmu!</p>
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
          <div className="box">
            {!hapus ? (
              <form onSubmit={handleForm}>
                <div className="formInput">{edit ? <h1>Edit Data</h1> : <h1>Tambah Data</h1>}</div>
                <div className="formInput">
                  <label htmlFor="nama">
                    Nama <span className="wajib">*</span>
                  </label>
                  <input type="text" id="nama" placeholder="Masukkan nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
                </div>
                <div className="formButton">
                  {edit ? <button type="submit">Simpan</button> : <button type="submit">Tambah</button>}
                  <button type="button" onClick={closeModal}>
                    Batal
                  </button>
                </div>
              </form>
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

export default Kategori;
