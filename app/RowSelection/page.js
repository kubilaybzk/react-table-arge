"use client";
import React, { useMemo } from "react";
import { useTable,useRowSelect } from "react-table";
import MOCK_DATA from "../../Data/MOCK_DATA.json";
import { COLUMNS } from "../../Data/columns";
import { Checkbox } from '../../Components/Checkbox'
export default function RowSelection() {
  //React'ın tablosunu kullanmak için gerekli olan bir hook iki farklı değere ihtiyacı vardır.

  //Her render işleminde datalarda yeniden fetch etme gibi olayların olmaması için gerekli.
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const TableInstance = useTable({
    columns: columns,
    data: data,
  },useRowSelect,
  hooks => {
    hooks.visibleColumns.push(columns => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Checkbox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
      },
      ...columns
    ])
  }
  
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,selectedFlatRows } =
    TableInstance;


  const firstPageRows = rows.slice(0, 10)

  return (
    <div className="p-10">
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
          {firstPageRows.map(row => {
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
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map(row => row.original)
            },
            null,
            2
          )}
        </code>
      </pre>
    </div>
  );
}

/*

Şimdi kullanıcının bazı tabloları seçtiğini ve seçtiği bu tablolar ile bir işlem yaptığını düşünelim.
   Tablomuz çok uzun bundan dolayı sadece ilk 10 sayfayı ele alalım.

      const firstPageRows = rows.slice(0, 10) 
            şeklinde bir değişken tanımlayıp

          <tbody className="bg-white dark:bg-slate-800" {...getTableBodyProps()}>
          {rows.map(row => {}}...
                
  Rows yerine bu değişkeni map edelim.

            <tbody className="bg-white dark:bg-slate-800" {...getTableBodyProps()}>
          {firstPageRows.map(row => {}}...

  Şimdi 10 tane row listelendi.

            Şimdi bir Checkbox comp oluşturalım.

            import React from 'react'

            export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
              const defaultRef = React.useRef()
              const resolvedRef = ref || defaultRef

              React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
              }, [resolvedRef, indeterminate])

              return (
                <>
                  <input type='checkbox' ref={resolvedRef} {...rest} />
                </>
              )
            })

--useRowSelect 'i import etmemiz gerekir.

import { useTable,useRowSelect } from "react-table";

--useRowSelect 'i import etmemiz gerekir. Daha sonra usTable içine aktarmamız gerkir.
 const TableInstance = useTable({
    columns: columns,
    data: data,
  },useRowSelect);

--Daha sonra seçilen row değerlerini tutan  selectedFlatRows arayini kullanmak için ;

 const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,selectedFlatRows } =
    TableInstance;

  Şimdi bir adet hook oluşturmamız gerekiyor.

    bunun için söyle bir yöntem izleyeecğiz.
      useTable'içine bir hook ekleyeceğiz.

       const TableInstance = useTable({
            columns: columns,
            data: data,
          },useRowSelect,
          ()=>{}
          
          );


          (hooks) => {
            hooks.visibleColumns.push(columns => [
              {
                id: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <Checkbox {...getToggleAllRowsSelectedProps()} />
                ),
                Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
              },
              ...columns
            ])
          }



*/
