import { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy } from 'react-table';

export default function Home() {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(true);  // dark mode default

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
        Header: 'Rank',
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
      { Header: 'Price', accessor: 'current_price', Cell: ({ value }) => `$${new Intl.NumberFormat().format(parseFloat(value))}` },
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
    <div className={`${darkMode ? 'bg-charcoalDark text-charcoalLight' : 'bg-gray-100 text-gray-800'} min-h-screen p-4 font-sans`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-3xl font-bold`}>
          Top Cryptocurrencies by Market Cap
        </h1>
        <div className="flex items-center space-x-4">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            darkMode={darkMode}
          />
          <button onClick={() => setDarkMode(!darkMode)} className="flex items-center">
            {darkMode ? <span className="text-charcoalLight">🌙</span> : <span className="text-charcoalDark">🌞</span>}
          </button>
        </div>
      </div>

      <table {...getTableProps()} className={`mx-auto w-4/5 min-w-full shadow-md rounded-lg overflow-hidden ${darkMode ? 'bg-charcoalLighter text-charcoalLight' : 'bg-white text-black'} table-fixed`}>

        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '17.5%' }} />
          <col style={{ width: '17.5%' }} />
          <col style={{ width: '17.5%' }} />
          <col style={{ width: '17.5%' }} />
          <col style={{ width: '17.5%' }} />
          <col style={{ width: '17.5%' }} />
          <col style={{ width: '17.5%' }} />
          <col style={{ width: '17.5%' }} />
          <col style={{ width: '17.5%' }} />
        </colgroup>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={`px-4 py-2 border-b ${darkMode ? 'text-charcoalLight' : 'text-gray-900'}`}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: `1px solid ${darkMode ? '#2f2f30' : '#dfdfef'}` }}>
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
      <Footer />
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
    <span>
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={`${count} records...`}
        className={`p-2 border rounded ${darkMode ? 'bg-charcoalMedium text-charcoalLight' : 'bg-white text-gray-900'}`}
      />
    </span>
  );
}


function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 mb-10 text-center">
      © {currentYear} SQS Trading Group LLC - Made with 🤖 in 🗽
    </footer>
  );
}