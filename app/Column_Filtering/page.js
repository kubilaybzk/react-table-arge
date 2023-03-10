"use client";
import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy, useFilters } from "react-table";
import MOCK_DATA from "../../Data/MOCK_DATA.json";
import { Column_filter } from "../../Data/columns";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { ColumnFileringInput } from "../../Components/ColumnFileringInput";
import { GlobalFiletingInput } from "../../Components/GlobalFiletingInput";
export default function Column_Filtering() {
  const columns = useMemo(() => Column_filter, []);
  const data = useMemo(() => MOCK_DATA, []);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFileringInput,
    }),
    []
  );

  const TableInstance = useTable(
    {
      columns: columns,
      data: data,
      defaultColumn
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = TableInstance;

  const { globalFilter } = state;

  return (
    <div className="p-10 text-center">
      <GlobalFiletingInput filter={globalFilter} setFilter={setGlobalFilter} />
      <table
        class="border-collapse table-auto w-full text-sm"
        {...getTableProps()}
      >
        <thead className="text-center bg-red-200">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="text-center bg-blue-200"
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="border-b  dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <>
                    <div className="flex flex-row justify-center items-center">
                      {column.render("Header")}
                      <div className="">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <div className="flex flex-row item-center w-[60px]">
                              <BsArrowUpShort className="text-red-400 text-3xl" />
                            </div>
                          ) : (
                            <div className="flex flex-row item-center w-[60px]">
                              <BsArrowDownShort className="text-red-400 text-3xl" />
                            </div>
                          )
                        ) : (
                          <div className="flex flex-row item-center w-[60px]">
                            <BsArrowDownShort className="text-gray-400 text-3xl" />
                            <BsArrowUpShort className="text-gray-400 text-3xl" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-slate-800" {...getTableBodyProps()}>
          {rows.map((row) => {
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
    </div>
  );
}

7; /* 

Filtering  i??in 2 farkl?? y??ntem kullan??labilir birinci y??ntem  t??m sat??r ve s??t??nlara g??re arama yapmay?? sa??layan global filtreleme y??ntemi.
  ikinci y??ntem ise column filtering y??ntemi
      ??imdi bu y??ntemi inceleyelim.
          useFilters kullan??m??n?? ????renelim.

            ColumnFileringInput ad??nda bir component yazal??m ve column olarak bir props als??n.


                  import React from 'react'

                    export const ColumnFileringInput = ({ column }) => {
                      const { filterValue, setFilter } = column
                      return (
                        <span>
                          Column Search:{' '}
                          <input
                            value={filterValue || ''}
                            onChange={e => setFilter(e.target.value)}
                          />
                        </span>
                      )
                    }
            
---- ??imdi ise useFilters'?? ekleyelim.

                    import { useTable, useGlobalFilter, useSortBy,useFilters } from "react-table";

---- Olu??turmu?? oldu??umuz TableInstance 'a bunu ba??ka bir props olarak ekleyelim.

----  Her bir filtre bir column'?? etkileyece??i i??in burada th etiketi i??inde d??zenleme ya??al??m.

                     <div>{column.canFilter ? column.render('Filter') : null}</div>
  
----  ??imdi datam??zda ????yle bir d??zenleme yapmam??z laz??m filtre compenentinin eklenmesi gerekiyor.         

Mesela Id olan k??s??mda filtreleme istemeyelim.
                    Headerlar??n oldu??u datama??a girip 
                    export const Column_filter = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    disableFilters: true,
    sticky: 'left'
  }
]

disableFilters: true, dersek o alanda filtreleme g??z??kmez 


Yada her bir alana 
 {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    sticky: 'left',
    Filter: ColumnFileringInput
  }
  
  Filter: ColumnFileringInput ??eklinde ekleme yapmak yerine
  s??yle bir y??ntem kullanabiliriz.

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFileringInput,
    }),
    []
  );

  ??eklinde bir tan??mlama yapar??z.

  ve bunu use table i??ine yollar??z

  const TableInstance = useTable(
    {
      columns: columns,
      data: data,
      defaultColumn
    }...);




    ??imdi Tablonun daha performansl?? ??al????mas??n?? isteyelim.
      



*/
