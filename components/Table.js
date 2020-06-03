import React from 'react';
import { useTable } from 'react-table';
import { useMutation, queryCache } from 'react-query';

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button';

export default function Table({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: 'id'
      },

      {
        Header: 'Name',
        accessor: 'attributes.name',
      },
      {
        Header: 'Email',
        accessor: 'attributes.email',
      },
      {
        Header: 'Account Created',
        accessor: 'attributes.created-at',
      },
    ],
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  const [deleteUser] = useMutation(async (id) => {
    await fetch(`/api/user/delete/${id}`, {
      method: "DELETE"
    })
  }, {
    onMutate: (id) => queryCache.setQueryData('users', prev => prev.filter(user => user.id !== id))
  })

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
              <Button size="small" variant="outlined" color="secondary" onClick={() => deleteUser(row.original.id)}>Delete</Button>
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}



