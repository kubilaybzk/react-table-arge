import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import "regenerator-runtime" 
export const GlobalFiletingInput = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
    const onChange = useAsyncDebounce(value => {
      setFilter(value || undefined)
    }, 1000)
  return (
    <div className="mb-20 w-full bg-yellow-100 flex flex-col items-start justify-start">
      <h1>Search Components</h1>
      <span className="flex flex-row w-full justify-center items-center gap-4 w-1/4">
        Global Search:{" "}
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={filter || ""}
          onChange={(e) => {
            setFilter(e.target.value);
            onChange(e.target.value);
          }}
        />
      </span>
    </div>
  );
};

