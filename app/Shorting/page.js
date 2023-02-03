"use client";
import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import MOCK_DATA from "../../Data/MOCK_DATA.json";
import { COLUMNS } from "../../Data/columns";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
export default function Shorting() {
  //React'ın tablosunu kullanmak için gerekli olan bir hook iki farklı değere ihtiyacı vardır.

  //Her render işleminde datalarda yeniden fetch etme gibi olayların olmaması için gerekli.
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const TableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    TableInstance;

  return (
    <div className="p-10 text-center">
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

useSortBy shorting için import edilmesi gerken bir hook daha sonra bu hook'u useTable içine başka bir agüman olarak eklememiz gerekecek.

  const TableInstance = useTable({
    columns: columns,
    data: data,
  },useSortBy);


  Şimdi biz bütün tablomuzu oluşturmuştuk burada amacımız ise ,
      Bütün tabloların  sort özelliğine sahip olmasını sağlamak
        Yapmamız gereken işlem çok basit.


          <tr {...headerGroup.getHeaderGroupProps()} className="text-center bg-blue-200">
          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400" {...cell.getCellProps()}>{cell.render('Cell')}</td>

          yukarıda bulunan iki satır içine propsları yollamıştık zaten

          getCellProps , getHeaderGroupProps fonksiyonları ile şimdi bu fonksiyonları kullanarak bu özellikleri otomatik olarak sağlamış olacağız.

                <tr {...headerGroup.getHeaderGroupProps()} >
                <td  {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>

          

*/
