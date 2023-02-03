import React from "react";
import { useTable } from "react-table";
import MOCK_DATA from "../Data/MOCK_DATA.json";
import { COLUMNS } from "../Data/columns";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className=" w-screen h-screen flex flex-col gap-20 items-center justify-center ">
        <h1 className="text-3xl font-bold">React-Table ile çok amaçlı tablo örnekleri </h1>

        <div className="grid grid-cols-3 gap-5 mx-auto">
          <Link href={"/Basic_Table"}>
            <span className="hover:text-blue-300">Basic Table</span>
          </Link>
          <Link href={"/Grouped_columns"}>
            <span className="hover:text-blue-300">Grouped columns</span>
          </Link>
          <Link href={"/Shorting"}>
            <span className="hover:text-blue-300">Shorting</span>
          </Link>

          <Link href={"/Formatting"}>
            <span className="hover:text-blue-300">Formatting</span>
          </Link>

          <Link href={"/Global_Filtering"}>
            <span className="hover:text-blue-300">Global Filtering</span>
          </Link>

          <Link href={"/Column_Filtering"}>
            <span className="hover:text-blue-300">Column Filtering</span>
          </Link>

          <Link href={"/More_Filtering"}>
            <span className="hover:text-blue-300">More Filtering</span>
          </Link>

          <Link href={"/Pagination"}>
            <span className="hover:text-blue-300">Pagination</span>
          </Link>

          <Link href={"/RowSelection"}>
            <span className="hover:text-blue-300">Row Selection</span>
          </Link>

          <Link href={"/OrderColumn"}>
            <span className="hover:text-blue-300">Order Column</span>
          </Link>

          <Link href={"/ColumnHiding"}>
            <span className="hover:text-blue-300">Column Hiding</span>
          </Link>

          <Link href={"/StickyColumns"}>
            <span className="hover:text-blue-300">Sticky Columns</span>
          </Link>

         
        </div>
      </div>
    </>
  );
}
