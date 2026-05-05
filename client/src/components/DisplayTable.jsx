
import React from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const DisplayTable = ({ data = [], columns = [] }) => {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2 overflow-x-auto">

      <table className="w-full border-collapse">

        {/* TABLE HEADER */}
        <thead className="bg-black text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              
              {/* Serial Number Column */}
              <th className="border px-2 py-1 text-left">Sr.No</th>

              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-2 py-1 text-left">
                  {
                    header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50">

                {/* Serial Number */}
                <td className="border px-2 py-1">
                  {index + 1}
                </td>

                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border px-2 py-1">
                    {
                      flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )
                    }
                  </td>
                ))}

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  )
}

export default DisplayTable