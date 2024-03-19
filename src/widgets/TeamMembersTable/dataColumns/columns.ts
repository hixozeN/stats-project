import { ColumnDef } from '@tanstack/react-table';
import { LestaClanUser } from 'entities/Lesta/model/types/clans';
import {
  calculatingStatistics,
  getDamage,
} from 'widgets/TeamMembersTable/lib/calculatingStatistics';
import { convertTimestamp } from 'widgets/TeamMembersTable/lib/convertTimestamp';

export const columns: ColumnDef<LestaClanUser>[] = [
  {
    header: 'Имя',
    accessorKey: 'nickname',
    sortDescFirst: true,
    size: 100,
  },
  {
    header: 'Роль',
    accessorKey: 'role',
    sortDescFirst: true,
    size: 100,
  },
  {
    header: 'Боёв',
    accessorKey: 'statistics.battles',
    accessorFn: ({ statistics }) => statistics.battles,
    size: 70,
  },
  {
    header: 'Винрейт',
    accessorKey: 'Winrate',
    accessorFn: ({ statistics }) => (
      `${calculatingStatistics(statistics.wins, statistics.battles)}%`
    ),
    sortDescFirst: true,
    size: 70,
  },
  {
    header: 'Урон',
    accessorKey: 'Damage',
    accessorFn: ({ statistics }) => getDamage(statistics.battles, statistics.damage_dealt),
    size: 70,
  },
  {
    header: 'WN8',
    accessorKey: 'wn8',
    accessorFn: ({ wn8 }) => wn8,
    size: 70,
  },
  {
    header: 'В бою',
    accessorKey: 'last_battle_time',
    cell: (info) => {
      const value = info.getValue();
      if (typeof value === 'number') {
        return convertTimestamp(value);
      }
      return info.getValue();
    },
    size: 120,
  },
  {
    header: 'В клане',
    accessorKey: 'joined_at',
    cell: (info) => {
      const value = info.getValue();
      if (typeof value === 'number') {
        return convertTimestamp(value);
      }
      return info.getValue();
    },
    size: 120,
  },
];
