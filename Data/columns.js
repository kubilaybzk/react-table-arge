import { format } from 'date-fns'
import Link from 'next/link'
import {ColumnFileringInput} from '../Components/ColumnFileringInput'

export const COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    disableFilters: true,
    sticky: 'left'
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    sticky: 'left'
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name',
    sticky: 'left'
  },
  {
    Header: 'Id',
    Footer: 'Date of Birth',
    accessor: 'date_of_birth',
  },
  {
    Header: 'Country',
    Footer: 'Country',
    accessor: 'country'
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone'
  },
  {
    Header: 'Email',
    Footer: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Price',
    Footer: 'Price',
    accessor: 'Price'
  },
]

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name'
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name'
      }
    ]
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth'
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country'
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
      }
    ]
  }
]



export const Formatting_Data = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    disableFilters: true,
    sticky: 'left'
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    sticky: 'left'
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name',
    sticky: 'left'
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    accessor: 'date_of_birth',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')}
  },
  {
    Header: 'Country',
    Footer: 'Country',
    accessor: 'country'
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone',
    Cell:({value})=>formatPhoneNumber(value)

  },
  {
    Header: 'Email',
    Footer: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Price',
    Footer: 'Price',
    accessor: 'Price',
    Cell: ({ value }) => {
      return value + "TL"}
  }
]

export const Column_filter = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    disableFilters: true,
    sticky: 'left'
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    sticky: 'left',
    Filter: ColumnFileringInput
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name',
    sticky: 'left'
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    accessor: 'date_of_birth',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')}
  },
  {
    Header: 'Country',
    Footer: 'Country',
    accessor: 'country'
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone',
    Cell:({value})=>formatPhoneNumber(value)

  },
  {
    Header: 'Email',
    Footer: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Price',
    Footer: 'Price',
    accessor: 'Price',
    Cell: ({ value }) => {
      return value + "TL"}
  }
]

export const COLUMNS_FINAL = [
  
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    sticky: 'left'
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name',
    sticky: 'left'
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    accessor: 'date_of_birth',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')}
    
  },
  {
    Header: 'Country',
    Footer: 'Country',
    accessor: 'country'
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone',
    Cell: ({ value }) => {
      return formatPhoneNumber(value)}
    
  
  },
  {
    Header: 'Email',
    Footer: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Price',
    Footer: 'Price',
    accessor: 'Price'
  },
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',

    Cell: ({ value }) => {
      return <Link href={`/detay/${value}`}>
        <div className='bg-red-200 px-5 '>
          Detay
        </div>
      </Link>},
        disableFilters:true,
        disableSortBy:true
    
  }
]


function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4]
  }
  return null
}