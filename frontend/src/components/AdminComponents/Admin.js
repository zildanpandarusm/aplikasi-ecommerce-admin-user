import React, { useState, useEffect, useMemo } from 'react';
import '../css/AdminStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPlus, faPenSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Admin = () => {
  const [idAdmin, setIdAdmin] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');
  const [file, setFile] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [aktif, setAktif] = useState(false);
  const [edit, setEdit] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [admin, setAdmin] = useState([]);

  const resetVariable = () => {
    setNama('');
    setEmail('');
    setTelepon('');
    setFile('');
    setPassword('');
    setConfPassword('');
    setMsg('');
  };

  const getAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin');
      setAdmin(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAdminById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/${id}`);
      setNama(response.data.nama);
      setEmail(response.data.email);
      setTelepon(response.data.telepon);
      setFile(response.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`http://localhost:5000/admin/${idAdmin}`);
      setIdAdmin('');
      setAktif(false);
      getAdmin();
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
        formData.append('email', email);
        formData.append('telepon', telepon);
        formData.append('foto', file);
        formData.append('password', password);
        formData.append('confPassword', confPassword);

        await axios.post('http://localhost:5000/admin', formData);
        resetVariable();
        setAktif(false);
        getAdmin();
      } catch (error) {
        setMsg(error.response.data.msg);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('email', email);
        formData.append('telepon', telepon);
        formData.append('foto', file);
        formData.append('password', password);
        formData.append('confPassword', confPassword);

        await axios.patch(`http://localhost:5000/admin/${idAdmin}`, formData);
        setAktif(false);
        resetVariable();
        setEdit(false);
        getAdmin();
      } catch (error) {
        setMsg(error.response.data.msg);
      }
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
    resetVariable();
  };

  const showEditModal = (id) => {
    setEdit(true);
    showModal();
    getAdminById(id);
    setIdAdmin(id);
  };

  const hapusModal = (id) => {
    showModal();
    setHapus(true);
    setIdAdmin(id);
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
    getAdmin();
  }, []);

  useEffect(() => {
    handleModal();
  }, [handleModal]);

  const data = useMemo(
    () =>
      admin.map((item) => ({
        uuid: item.uuid,
        nama: item.nama,
        email: item.email,
        telepon: item.telepon,
        url: item.url,
      })),
    [admin]
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
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Telepon',
        accessor: 'telepon',
      },
      {
        Header: 'Foto',
        accessor: 'url',
        Cell: ({ value }) => <img src={value} alt="Foto Profil" />,
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
        <h1>Admin</h1>
        <p>Atur daftar admin!</p>
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
                <div className="formInput">{edit ? <h1>Edit Data</h1> : <h1>Tambah Data</h1>}</div>{' '}
                <form onSubmit={handleForm}>
                  <div className="leftSide">
                    <div className="formInput">
                      <label htmlFor="nama">
                        Nama <span className="wajib">*</span>
                      </label>
                      <input type="text" id="nama" placeholder="Masukkan nama" onChange={(e) => setNama(e.target.value)} value={nama} required />
                    </div>
                    <div className="formInput">
                      <label htmlFor="email">
                        Email <span className="wajib">*</span>
                      </label>
                      <input type="email" placeholder="Masukkan email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>
                    <div className="formInput">
                      <label htmlFor="telepon">
                        Telepon <span className="wajib">*</span>
                      </label>
                      <input type="text" placeholder="Masukkan telepon" id="telepon" onChange={(e) => setTelepon(e.target.value)} value={telepon} required />
                    </div>
                    <div className="formInput">
                      <label htmlFor="foto">
                        Foto <span className="wajib">*</span>
                        <FontAwesomeIcon className="icon" icon={faCamera} />
                      </label>
                      {edit ? (
                        <div className="editFile">
                          <input type="file" id="foto" onChange={(e) => setFile(e.target.files[0])} /> <img src={file} alt="foto" width="30px" height="30px" />
                        </div>
                      ) : (
                        <input type="file" id="foto" onChange={(e) => setFile(e.target.files[0])} />
                      )}
                    </div>
                  </div>
                  <div className="rightSide">
                    <div className="formInput">
                      <label htmlFor="password">
                        Password <span className="wajib">*</span>
                      </label>
                      <input type="password" placeholder="Masukkan password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                    <div className="formInput">
                      <label htmlFor="confPassword">
                        Konfirmasi Password <span className="wajib">*</span>
                      </label>
                      <input type="password" placeholder="Masukkan konfirmasi password" id="confPassword" onChange={(e) => setConfPassword(e.target.value)} value={confPassword} required />
                    </div>
                    <div className="formButton">
                      {edit ? <button type="submit">Simpan</button> : <button type="submit">Tambah</button>}
                      <button type="button" onClick={closeModal}>
                        Batal
                      </button>
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

export default Admin;
