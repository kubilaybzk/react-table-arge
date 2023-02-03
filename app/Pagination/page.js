"use client";
import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import MOCK_DATA from "../../Data/MOCK_DATA.json";
import { COLUMNS } from "../../Data/columns";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";

export default function Pagination() {
  //React'ın tablosunu kullanmak için gerekli olan bir hook iki farklı değere ihtiyacı vardır.

  //Her render işleminde datalarda yeniden fetch etme gibi olayların olmaması için gerekli.
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const TableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = TableInstance;

  const { pageIndex,pageSize } = state;

  return (
    <div className="p-10">
      <table
        class="border-collapse table-auto w-full text-sm"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-slate-800" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row justify-between items-center">
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <TbPlayerTrackPrev className="hover:bg-blue-400 text-3xl " />
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <GrFormPrevious className="hover:bg-blue-400 text-3xl " />
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <GrFormNext className="hover:bg-blue-400 text-3xl " />
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <TbPlayerTrackNext className="hover:bg-blue-400 text-3xl " />
          </button>
        </div>

        <div>
          <span className="flex flex-row items-center gap-2">
            Git:
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              className="border-2 w-12"
            />
          </span>
        </div>

        <div>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5,10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                 {pageSize} adet
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row gap-3 items-center justify-center">
          <span>Sayfa</span>
          <strong>{pageIndex + 1}</strong>
          <span>'den</span>
          <strong>{pageOptions.length}</strong>
        </div>
      </div>
    </div>
  );
}

/*

----Pagination kullanmak için ilk olarak usePagination'ı import etmemiz gerekiyor.

import { useTable,usePagination } from "react-table";

----Daha önce rows'u oluşturduğumuz table içinde array olarak alıp
       kullanıyorduk şimdi bunu tamamen ortadan kaldıracağız ve artık page değişkenini kullanacağız

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    TableInstance;

--Daha sonra bunu useTable'a usePagination olarak iletmemiz gerekiyor.


        const TableInstance = useTable({
            columns: columns,
            data: data,
          },
          usePagination);

  
--Şimdi pagination özellikleri sağlayalım .

      nextPage,
      previousPage,
      canPreviousPage,
      canNextPage,

--Şimdi pagination özellikleri sağlayalım .

  --Öncelikle amacımız burada aktif olan index ve toplam index sayısını göstermek olsun.

      pageOptions 
      state 
        olmak üzere 2 değişken daha ekleyelim.

  --şimdi ise en başa en sona gitmesini sağlayan butonları ekleyelim.
      gotoPage,
      pageCount
          değişkenlerini ekleyelim

--Kullanıcının istediği sayfaya gitmesi için gereken alanı yapalım
<span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>

--Tablonun her bir sayfasında toplam kaç eleman gözüksün diye ayarlama yapmak için ;

            setPageSize değişkenini kullanabiliriz.

              const { pageIndex,pageSize } = state;

                Select içinde 
                  <select
                  value={pageSize}
                  onChange={e => setPageSize(Number(e.target.value))}>
                  {[10, 25, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>



*/
