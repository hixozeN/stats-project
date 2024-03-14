import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from '@tanstack/react-table';
import { classNames } from 'shared/lib/classNames/classNames';
import { columns } from 'widgets/TeamMembersTable/dataColumns/columns';
import { usersClan } from 'widgets/TeamMembersTable/lib/usersClan';
import { getLestaClanMembers, getLestaClanPlayers } from 'entities/Lesta';
import { LestaClanUser } from 'entities/Lesta/model/types/clans';
import { HeaderRow } from './HeaderRow/index';
import { BodyRow } from './BodyRow/index';
import { fuzzyFilter } from '../lib/sort';
import cls from './TeamMembersTable.module.scss';

interface TableProps {
  className?: string;
}

type ColumnSort = {
  id: string;
  desc: boolean;
};

type SortingState = ColumnSort[];

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
}

export const TeamMembersTable = memo(({ className }: TableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const playersSelector = useSelector(getLestaClanPlayers);
  const membersSelector = useSelector(getLestaClanMembers);
  const users: LestaClanUser[] = usersClan(playersSelector, membersSelector);

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });

  if (users[0] === undefined) return null;

  return (
    <table className={classNames(cls.table, {}, [className])}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <HeaderRow key={headerGroup.id} headerGroup={headerGroup} />
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <BodyRow key={row.id} row={row} />
        ))}
      </tbody>
    </table>
  );
});
