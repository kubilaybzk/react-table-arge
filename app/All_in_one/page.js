"use client";
import React, { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import MOCK_DATA from "../../Data/MOCK_DATA.json";
import { COLUMNS_FINAL } from "../../Data/columns";
import { GlobalFiletingInput } from "@/Components/GlobalFiletingInput";
import {
  TbPlayerTrackPrev,
  TbPlayerTrackNext,
  TbCaretRight,
  TbCaretLeft,
} from "react-icons/tb";
import { SortIcon, SortUpIcon, SortDownIcon } from "../../Components/Icons";

export default function Basic_Table() {
  const columns = useMemo(() => COLUMNS_FINAL, []);
  const data = useMemo(() => MOCK_DATA, []);

  const TableInstance = useTable(
    {
      columns: columns,
      data: data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = TableInstance;

  //const firstPageRows = rows.slice(0, 10); // ilk 10 sayfayı tutalım.
  const { globalFilter } = state; // GlobalFilter'ın state değerlerini declare ediyoruzz
  const { pageIndex, pageSize } = state; //pagination için kaç eleman sayfada gözüksün diye seçmemiz için gerekli .

  return (
    <div className="p-10 bg-gray-200 w-full h-full">
      {/* Search and Row Size  */}
      <div class="my-2 pb-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0">
          <div class="relative">
            <select
              class=" h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 25, 50].map((pageSize) => (
                <option className="w-full" key={pageSize} value={pageSize}>
                  {pageSize} adet
                </option>
              ))}
            </select>

            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
              </svg>
            </div>
          </div>
          <div class="relative">
            <select class=" hidden appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
              </svg>
            </div>
          </div>
        </div>
        <GlobalFiletingInput
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
      </div>
      {/* Table   */}
      <div className="w-full overflow-auto">
        <table
          className="min-w-max w-full overflow-x-auto table-auto bg-white"
          {...getTableProps()}
        >
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-white">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="py-3 px-6 text-left"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className="flex flex-row justify-center items-center">
                      {column.render("Header")}
                      <div className="">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <div className="flex flex-row item-center w-5">
                              <SortUpIcon className="text-red-400 text-lg" />
                            </div>
                          ) : (
                            <div className="flex flex-row item-center w-5">
                              <SortDownIcon className="text-red-400 text-lg" />
                            </div>
                          )
                        ) : (
                          <div className="flex flex-col item-center w-5 justify-center ml-3 ">
                            <SortIcon className="text-gray-400 text-lg" />
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className="text-gray-600 text-sm font-light"
            {...getTableBodyProps()}
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b border-gray-200 hover:bg-gray-100 "
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="py-3 px-6 whitespace-nowrap text-center"
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
      {/* Navbar Pagination  */}
      <nav
        className=" flex flex-col w-full items-end justify-end pt-2 gap-2"
        aria-label="Pagination"
      >
        {/* Go to  */}
        <div className="flex flex-row">
          <span className="flex flex-row items-center justify-end gap-2 mr-4">
            Git:
            <input
              className="appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-1/2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
            />
          </span>

          <button
            className="rounded-l-md relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 "
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">First</span>
            <TbPlayerTrackPrev
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
          <button
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Previous</span>
            <TbCaretLeft className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
          <button
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <span className="sr-only">Next</span>
            <TbCaretRight
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
          <button
            className="rounded-r-md relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Last</span>
            <TbPlayerTrackNext
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </div>
        {/* Page Information */}
        <div className="flex flex-row gap-3 items-center justify-center">
          <span className="text-sm">Sayfa</span>
          <strong className="text-sm">{pageIndex + 1}</strong>
          <span className="text-sm">'den</span>
          <strong className="text-sm">{pageOptions.length}</strong>
        </div>
      </nav>
    </div>
  );
}
