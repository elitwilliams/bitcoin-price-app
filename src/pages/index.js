import { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy } from 'react-table';

export default function Home() {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/topCoins');
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        id: 'rank',
        accessor: (row, i) => i + 1,
        disableFilters: true,
      },
      {
        Header: 'Logo',
        accessor: 'image',
        Cell: ({ value }) => <img src={value} alt="coin-logo" className="w-6 h-6" />,
        disableFilters: true,
      },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Price', accessor: 'current_price', Cell: ({ value }) => `$${parseFloat(value).toFixed(2)}` },
      { Header: 'Symbol', accessor: 'symbol', Cell: ({ value }) => value.toUpperCase() },
      {
        Header: 'Volume',
        accessor: 'total_volume',
        Cell: ({ value }) => `$${new Intl.NumberFormat().format(value)}`,
      },
      { Header: 'Market Cap', accessor: 'market_cap', Cell: ({ value }) => `$${new Intl.NumberFormat().format(value)}` },
      {
        Header: 'High 24h',
        accessor: 'high_24h',
        Cell: ({ value }) => `$${new Intl.NumberFormat().format(parseFloat(value))}`,
      },
      {
        Header: 'Low 24h',
        accessor: 'low_24h',
        Cell: ({ value }) => `$${new Intl.NumberFormat().format(parseFloat(value))}`,
      },
      { Header: 'Price Change (24h)', accessor: 'price_change_24h', Cell: ({ value }) => `${parseFloat(value).toFixed(2)}%` },
      { Header: 'Price Change Percentage (24h)', accessor: 'price_change_percentage_24h', Cell: ({ value }) => `${parseFloat(value).toFixed(2)}%` },
    ],
    []
  );

  const today = new Date().toLocaleDateString();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

  return (
    <div className={`font-gabarito ${darkMode ? 'bg-charcoalDark' : 'bg-gray-100'} min-h-screen p-4`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-charcoalLight' : 'text-black'}`}>
          Top Cryptocurrencies by Market Cap - {today}
        </h1>
        <div className="flex items-center space-x-4">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            darkMode={darkMode}
          />
          <div className="relative inline-block text-left">
            <button onClick={() => setDarkMode(!darkMode)} className="flex items-center">
              {darkMode ? <span className="text-charcoalLight mr-1">🌙</span> : <span className="text-charcoalDark mr-1">💡</span>}
            </button>
          </div>
        </div>
      </div>

      <table {...getTableProps()} className={`mx-auto w-4/5 min-w-full shadow-md rounded-lg overflow-hidden ${darkMode ? 'bg-charcoalMedium text-charcoalLight' : 'bg-white text-black'} table-fixed`}>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '7.5%' }} />
          <col style={{ width: '7.5%' }} />
        </colgroup>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={`px-4 py-2 border-b border-gray-500 ${darkMode ? 'underline text-gray-200' : 'text-gray-900'}`}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className={`px-4 py-2`}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  darkMode,
}) {
  const count = preGlobalFilteredRows.length;

  return (
    <span className={`p-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={`${count} records...`}
        className={`p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
      />
    </span>
  );
}
