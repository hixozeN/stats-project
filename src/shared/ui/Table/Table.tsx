import {
  ReactElement, memo, useMemo, useState,
} from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import master from 'shared/assets/icons/mastery/master.png';
import firstStage from 'shared/assets/icons/mastery/first_stage.png';
import secondStage from 'shared/assets/icons/mastery/second_stage.png';
import thirdStage from 'shared/assets/icons/mastery/third_stage.png';
import { getWinRate } from 'shared/lib/statCounters/getWinRate/getWinRate';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import cls from './Table.module.scss';
import { Button } from '../Button/Button';

interface ITableProps {
  className?: string;
  data?: TUserTanks[];
}

export const Table = memo(({ data }: ITableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const mastery: Record<number, ReactElement> = useMemo(
    () => ({
      4: master,
      3: firstStage,
      2: secondStage,
      1: thirdStage,
    }),
    [],
  );

  const columns = useMemo<ColumnDef<TUserTanks>[]>(
    () => [
      {
        accessorKey: 'tankData.image_preview',
        header: '',
        // eslint-disable-next-line react/no-unstable-nested-components
        cell: (info) => {
          if (info.getValue()) {
            return (
              <img className={cls.icon} src={`${info.getValue()}`} alt="" />
            );
          }
          return '';
        },
      },
      {
        accessorKey: 'tankData.name',
        header: 'Танк',
      },
      {
        accessorKey: 'tankData.tier',
        header: 'Уровень',
      },
      {
        accessorKey: 'statistics.battles',
        header: 'Боёв',
      },
      {
        accessorFn: ({ statistics }) => `${getWinRate(statistics.wins, statistics.battles)}`,
        header: 'WIN%',
      },
      // {
      //   header: 'ADR',
      //   accessorFn: ({ statistics }) => `${getAvgDamage(statistics.damage_dealt, statistics.battles)}`,
      // },
      {
        accessorKey: 'WN8',
        header: 'WN8',
        cell: '0',
      },
      {
        accessorKey: 'mark_of_mastery',
        header: 'Степень',
        // eslint-disable-next-line react/no-unstable-nested-components
        cell: (info) => {
          if (info.getValue()) {
            return (
              <img
                className={cls.mastery}
                src={`${mastery[Number(info.getValue())]}`}
                alt={`${info.getValue()}`}
              />
            );
          }
          return '';
        },
      },
    ],
    [mastery],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="">
      <div className="" />
      <table>
        <caption className={cls.title}>
          {`Техника (${table.getRowModel().rows.length})`}
        </caption>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: (
                          <Button theme="icon-right" variant="chevron-down" />
                        ),
                        desc: (
                          <Button theme="icon-right" variant="chevron-down" />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
});
