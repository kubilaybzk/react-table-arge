"use client";
import React, { useMemo } from "react";
import { useTable,useColumnOrder } from "react-table";
import MOCK_DATA from "../../Data/MOCK_DATA.json";
import { COLUMNS } from "../../Data/columns";

export default function Basic_Table() {
  //React'ın tablosunu kullanmak için gerekli olan bir hook iki farklı değere ihtiyacı vardır.

  //Her render işleminde datalarda yeniden fetch etme gibi olayların olmaması için gerekli.
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const TableInstance = useTable({
    columns: columns,
    data: data,
  },
  useColumnOrder);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,setColumnOrder } =
    TableInstance;


    const changeOrder = () => {
      setColumnOrder(['id', 'first_name', 'last_name', 'phone', 'country', 'date_of_birth'])
  }

  return (
    <div className="p-10">
      <button className="px-2 bg-blue-200 hover:bg-blue-600 text-white rounded mb-10" onClick={()=>changeOrder()}>Sıralmayı değiştir.</button>
      <table class="border-collapse table-auto w-full text-sm" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-slate-800" {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

/*


Tablo sıralama işlemi aslında düşünüldüğünden kolay
      Yapmamız gereken işlem çok basit.
---Tabloda sıralama yapmak için öncelikle  useColumnOrder'i import edelim
        import { useTable,useColumnOrder } from "react-table";


---Tabloda sıralama yapmak için öncelikle  Daha sonra useTable içinde tanımlayalım.

  const TableInstance = useTable({
    columns: columns,
    data: data,
  },
  useColumnOrder);


---Daha sonra bu tablo içinden bu hook'ı destruct ederek kullanmaya başlayalım.

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,setColumnOrder } =
      TableInstance;

---column değerlerini almış oludğumuz column.js içinde bulunan  accessor isimli değişkene göre  aşağıdaki
      state değiştirme işlemini yapalım ve sıralmayı belirtelim.

  const changeOrder = () => {
      setColumnOrder(['id', 'first_name', 'last_name', 'phone', 'country', 'date_of_birth'])
  }


*/