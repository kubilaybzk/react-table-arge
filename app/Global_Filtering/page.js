"use client";
import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import MOCK_DATA from "../../Data/MOCK_DATA.json";
import { Formatting_Data } from "../../Data/columns";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { GlobalFiletingInput } from "../../Components/GlobalFiletingInput";

export default function Global_Filtering() {
  const columns = useMemo(() => Formatting_Data, []);
  const data = useMemo(() => MOCK_DATA, []);

  const TableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
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
     global filtering i??in ; 
        Bir adet yeni bir component olu??tural??m illa olu??turmam??z gerekmiyor fakat biz burada kod fazlal??????n?? engellemek i??in bu y??ntemi tercih edelim.

        import React, { useState } from 'react'
        import { useAsyncDebounce } from 'react-table'

        export const GlobalFilter = ({ filter, setFilter }) => {
          
          const [value, setValue] = useState(filter)   // Buras?? input de??erini tutu??umuz alan.
          
          const onChange = useAsyncDebounce(value => {
            setFilter(value || undefined)               // input de??erlerini assign etti??imiz fonksiyon.  // ??zel bir fonksiyon ????nk?? biraz bekliyor buda daha kullan??c?? deneyimi bir kullan??m sa??l??yor
          }, 1000)

          return (
            <span>
              Search:{' '}
              <input
                value={value || ''}
                onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
              />
            </span>
          )
        }

---- ilk yapmam??z gereken useGlobalFilter '?? import etmek .

        import { useTable, useGlobalFilter } from "react-table";

---- Daha sonra shorting'de yapt??????m??z gibi useTable i??ine ikinci arg??man olarak bunu eklememiz gerekiyor.
        
         const TableInstance = useTable(
              {
                columns: columns,
                data: data,
              },
              useGlobalFilter
            );

---- Daha sonra olu??turmu?? oldu??umuz TableInstance i??inden iki adet daha state'e ihtiyac??m??z var bunlar state ve setGlobalFilter.
              State => Tablonun o anki durumunu vb. tutan bir state 
              setGlobalFilter=> bu ise input alan??ndan gelen de??er .
                    Bunlar sayesinde kendi kendimize bir state olu??turma ihtiyac??m??z olmayacak.

              ilk olarak state'i destruckt ederek i??inden globalfilter de??erimizi alal??m.






*/
