import React, { useState, useEffect, useMemo } from 'react';
import '../css/AdminStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenSquare, faTrashAlt, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import axios from 'axios';

const Pengguna = () => {
  const [idPengguna, setIdPengguna] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');
  const [file, setFile] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [aktif, setAktif] = useState(false);
  const [edit, setEdit] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [pengguna, setPengguna] = useState([]);

  const resetVariable = () => {
    setNama('');
    setEmail('');
    setAlamat('');
    setTelepon('');
    setFile('');
    setPassword('');
    setConfPassword('');
    setMsg('');
  };

  const getPengguna = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pengguna');
      setPengguna(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPenggunaById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/pengguna/${id}`);
      setNama(response.data.nama);
      setEmail(response.data.email);
      setAlamat(response.data.alamat);
      setTelepon(response.data.telepon);
      setFile(response.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`http://localhost:5000/pengguna/${idPengguna}`);
      setIdPengguna('');
      setAktif(false);
      getPengguna();
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
        formData.append('alamat', alamat);
        formData.append('telepon', telepon);
        formData.append('foto', file);
        formData.append('password', password);
        formData.append('confPassword', confPassword);

        await axios.post('http://localhost:5000/pengguna', formData);
        resetVariable();
        setAktif(false);
        getPengguna();
      } catch (error) {
        setMsg(error.response.data.msg);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('email', email);
        formData.append('alamat', alamat);
        formData.append('telepon', telepon);
        formData.append('foto', file);
        formData.append('password', password);
        formData.append('confPassword', confPassword);

        await axios.patch(`http://localhost:5000/pengguna/${idPengguna}`, formData);
        setAktif(false);
        resetVariable();
        setEdit(false);
        getPengguna();
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
    getPenggunaById(id);
    setIdPengguna(id);
  };

  const hapusModal = (id) => {
    showModal();
    setHapus(true);
    setIdPengguna(id);
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
    getPengguna();
  }, []);

  useEffect(() => {
    handleModal();
  }, [handleModal]);

  const data = useMemo(
    () =>
      pengguna.map((item) => ({
        uuid: item.uuid,
        nama: item.nama,
        email: item.email,
        alamat: item.alamat,
        telepon: item.telepon,
      })),
    [pengguna]
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
        Header: 'Alamat',
        accessor: 'alamat',
      },
      {
        Header: 'Telepon',
        accessor: 'telepon',
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
        <h1>Pengguna</h1>
        <p>Ada siapa saja pengguna yang terdaftar disini?</p>
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
                      <label htmlFor="alamat">
                        Alamat <span className="wajib">*</span>
                      </label>
                      <input type="text" placeholder="Masukkan alamat" id="alamat" onChange={(e) => setAlamat(e.target.value)} value={alamat} required />
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

export default Pengguna;
