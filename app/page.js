import React from "react";
import { useTable } from "react-table";
import MOCK_DATA from "../Data/MOCK_DATA.json";
import { COLUMNS } from "../Data/columns";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-row justify-around align-middle items-center flex-wrap gap-4">
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

        <Link href={"/Go_to_page"}>
          <span className="hover:text-blue-300">Go to page</span>
        </Link>


        
      </div>
    </>
  );
}
