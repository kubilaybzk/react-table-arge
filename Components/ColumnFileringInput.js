import React from 'react'

export const ColumnFileringInput = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      Column Search:{' '}
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}