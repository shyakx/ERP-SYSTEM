import React from 'react';

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
}

interface CompactTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  emptyText?: string;
}

function CompactTable<T>({ columns, data, rowKey, emptyText = 'No data found.' }: CompactTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th
                key={col.key as string}
                className={`px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'} ${col.className || ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center text-gray-400 py-6">{emptyText}</td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={rowKey(row)} className="hover:bg-gray-50 transition-colors">
                {columns.map((col, j) => (
                  <td
                    key={col.key as string}
                    className={`px-3 py-2 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'} ${col.className || ''}`}
                  >
                    {col.render ? col.render(row, i) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CompactTable; 