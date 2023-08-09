import React, { useState, useEffect, useMemo } from 'react';
import '../css/AdminStyle.css';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import axios from 'axios';

const OrderItem = () => {
  const [orderItem, setOrderItem] = useState([]);

  const getOrderItem = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orderitem');
      setOrderItem(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrderItem();
  }, []);

  const data = useMemo(
    () =>
      orderItem.map((item) => ({
        orderId: item.orderId,
        barangId: item.barangId,
        jumlah: item.jumlah,
        subtotal: item.subtotal,
        pesan: item.pesan,
      })),
    [orderItem]
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
        Header: 'Order Id',
        accessor: 'orderId',
      },
      {
        Header: 'Barang Id',
        accessor: 'barangId',
      },
      {
        Header: 'Jumlah',
        accessor: 'jumlah',
      },
      {
        Header: 'Subtotal',
        accessor: 'subtotal',
      },
      {
        Header: 'Pesan',
        accessor: 'pesan',
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
        <h1>Order Item</h1>
        <p>Data order item yang masuk sesuai pesanan pelanggan!</p>
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
    </div>
  );
};

export default OrderItem;
