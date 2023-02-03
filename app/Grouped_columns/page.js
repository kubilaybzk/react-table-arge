"use client";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "../../Data/MOCK_DATA.json";
import { GROUPED_COLUMNS } from "../../Data/columns";

export default function Grouped_columns() {
  //React'ın tablosunu kullanmak için gerekli olan bir hook iki farklı değere ihtiyacı vardır.

  //Her render işleminde datalarda yeniden fetch etme gibi olayların olmaması için gerekli.
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const TableInstance = useTable({
    columns: columns,
    data: data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    TableInstance;

  return (
    <div className="p-10 text-center">
      <table class="border-collapse table-auto w-full text-sm" {...getTableProps()}>
        <thead className="text-center bg-red-200">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-center bg-blue-200">
              {headerGroup.headers.map(column => (
                <th className="border-b  dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center" {...column.getHeaderProps()}>{column.render('Header')}</th>
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

      <table >
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
            </tr>
          </tbody>
      </table>


    Şeklinde tablomuzu oluşturalım daha sonra bu tabloya bizim datalarımızı eklememiz lazım
    bunun için şu yöntemi kullanabiliriz.

    Oluşturduğumuz  TableInstance hookuna  girip array ve fonksiyonları kendimize döndürmemiz lazım.

     const {getTableProps, getTableBodyProps,headerGroups,rows,prepareRow}=TableInstance;

      getTableProps
      getTableBodyProps
      headerGroups      => Burasısı headerları grupladığımız zaman map ile dönmemiz için gereken bir array.
      rows
      prepareRow

---------getTableProps=> tablo etiketinin içine destruct edilmesi gerekir. (Fonksiyon'dur.)
    
     
            <table {...getTableProps()}>
                  <thead>
                    <tr>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                    </tr>
                  </tbody>
            </table>  

    
---------getTableBodyProps=> tablo'nun body  etiketinin içine destruct edilmesi gerekir. (Fonksiyon'dur.)



                <table {...getTableProps()}>
                      <thead>
                        <tr>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        <tr>
                          <td></td>
                        </tr>
                      </tbody>
                </table>


---------headerGroups => tablo'nun head   etiketinin içine destruct edilmesi gerekir. (Fonksiyon'dur.)
            bu bizim bütün headerlarımızın gruplandığı ve map edilmesi gereken bir fonksiyondur.
              Burada ilk olarak head etiketi içinde bir map oluşturmalıyız.
              
        
              <thead>
                {
                  headerGroups.map((headerGroup)=>(
                    <tr>
                        <th>
                            ...
                        </th>
                    </tr>
                  ))
                }
              </thead>

---------Daha sonra her bir tr etiketine bizim {...headerGroup.getHeaderGroupProps()} şeklinde headerların propslarını destruck etmemiz gerekiyor.


                <thead>
                    { 
                      headerGroups.map((headerGroup)=>(
                        <tr{...headerGroup.getHeaderGroupProps()}>
                          <th>
                              ...
                          </th>
                        </tr>
                      ))
                    }
                </thead>


---------Her bir Tr etiketine propslarını destruckt ettikten sonra yapmamız gereken diğer işlem th etkiletlerinin durumlarını ayarlamak Öncelikle
             her bir tr etiketini oluşturmak ve her bir th etiketine propsları aktarmak .
                    Daha sonra ise 
                            {column.render('Header')} 'diyerek ekrana bastırıyoruz.


        <thead>
          {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                          {column.render('Header')}
                      </th>
                  ))}
                </tr>
          ))}
        </thead>


        Genel mantık 
                    ANA ETİKET >  ==>  ,tbody
                    >headerGroups maple 
                    > tr'etiketlerinin proplarını aktar.
                    > tr' içinde tekrar maple 
                    > th etiketlerinin proplarını aktar 
                    > {column.render('Header')} 'ile içeriği oluştur.
                  

      



*/
