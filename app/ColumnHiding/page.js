"use client";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "../../Data/MOCK_DATA.json";
import { COLUMNS } from "../../Data/columns";
import { Checkbox } from "@/Components/Checkbox";

export default function ColumnHiding() {
  //React'ın tablosunu kullanmak için gerekli olan bir hook iki farklı değere ihtiyacı vardır.

  //Her render işleminde datalarda yeniden fetch etme gibi olayların olmaması için gerekli.
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const TableInstance = useTable({
    columns: columns,
    data: data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    getToggleHideAllColumnsProps,
    allColumns,
  } = TableInstance;

  return (
    <div className="p-10">
      <div className="flex flex-row item-center justify-around mb-10">
        <input type="checkbox" {...getToggleHideAllColumnsProps()} /> Hepsini
        Göster
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
              {column.Header}
            </label>
          </div>
        ))}
      </div>

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

/*


Belirli sutunları gösterip belirli sutunları göstermeme gidi durumları isteyebilir kullanıcı bu gibi durumlarda.
  kullanıcıya seçim hakkı sunmamız gerkebilir.



---Burada herhangi bir import durumu yok sadece oluşturduğumuz useTable içinde 
        getToggleHideAllColumnsProps ve allColumns hooklarını çekmemiz gerkeiyor


        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,getToggleHideAllColumnsProps,allColumns } =
          TableInstance;

---Tablomuzun üst tarafına bir div içine bir checkbox oluşturup getToggleHideAllColumnsProps destruckt edelim

        <div>
          <input type="checkbox" {...getToggleHideAllColumnsProps()} /> Hepsini
          Göster
      </div>

      Daha sonra bunu her bir satış için yapmak istersek  allColumns arrayini kullanmamız gerekir.

      bunu map ile dönelim


      {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
              {column.Header}
            </label>
          </div>
        ))}

*/
