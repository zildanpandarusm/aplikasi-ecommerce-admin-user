import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faPenSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import axios from 'axios';

const Orders = () => {
  const [status, setStatus] = useState('');
  const [kurir, setKurir] = useState('');
  const [resi, setResi] = useState('');
  const [idOrders, setIdOrders] = useState('');
  const [orders, setOrders] = useState([]);
  const [aktif, setAktif] = useState(false);
  const [edit, setEdit] = useState(false);
  const [hapus, setHapus] = useState(false);
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOrdersById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/${id}`);
      setStatus(response.data.status);
      setKurir(response.data.kurir);
      setResi(response.data.resi);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`http://localhost:5000/orders/${idOrders}`);
      setIdOrders('');
      setHapus(false);
      setAktif(false);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (edit) {
      try {
        await axios.patch(`http://localhost:5000/orders/${idOrders}`, {
          status: status,
          kurir: kurir,
          resi: resi,
        });
        setAktif(false);
        setEdit(false);
        getOrders();
        setStatus('');
        setKurir('');
        setResi('');
        setIdOrders('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const detailOrders = (id) => {
    console.log(id);
    navigate(`/admin/detailorders/${id}`);
  };

  const showModal = () => {
    setAktif(true);
  };

  const closeModal = () => {
    setAktif(false);
    setEdit(false);
    setHapus(false);
    setKurir('');
    setResi('');
  };

  const showEditModal = (id) => {
    setEdit(true);
    showModal();
    getOrdersById(id);
    setIdOrders(id);
  };

  const hapusModal = (id) => {
    showModal();
    setHapus(true);
    setIdOrders(id);
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
    getOrders();
  }, []);

  useEffect(() => {
    handleModal();
  }, [handleModal]);

  const data = useMemo(
    () =>
      orders.map((item) => ({
        id: item.id,
        uuid: item.uuid,
        nama: item.pengguna.nama,
        telepon: item.pengguna.telepon,
        tanggal: item.tanggal,
        status: item.status,
        total_harga: item.total_harga,
      })),
    [orders]
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
        Header: 'Nama Pembeli',
        accessor: 'nama',
      },
      {
        Header: 'Telepon',
        accessor: 'telepon',
      },
      {
        Header: 'Jam & Tanggal',
        accessor: 'tanggal',
      },

      {
        Header: 'Total Harga',
        accessor: 'total_harga',
      },
      {
        Header: 'Status',
        accessor: 'status',
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
        <h1>Pesanan Terbaru</h1>
        <p>Segera atur pesanan!</p>
      </div>
      <div className="konten">
        <div className="tambah">
          <div className="table-controls">
            <label htmlFor="cari">Search : </label>
            <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari..." id="cari" />
          </div>
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
                  <label htmlFor="status">Status</label>
                  <select name="status" id="status" onChange={(e) => setStatus(e.target.value)} value={status}>
                    <option value="diterima">diterima</option>
                    <option value="dikonfirmasi">dikonfirmasi</option>
                    <option value="dikirim">dikirim</option>
                    <option value="selesai">selesai</option>
                  </select>
                </div>
                <div className="formInput">
                  <label htmlFor="kurir">Kurir</label>
                  <input type="text" placeholder="Masukkan kurir" id="kurir" onChange={(e) => setKurir(e.target.value)} value={kurir} />
                </div>
                <div className="formInput">
                  <label htmlFor="resi">Resi</label>
                  <input type="text" placeholder="Masukkan resi" id="resi" onChange={(e) => setResi(e.target.value)} value={resi} />
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

export default Orders;
