import { Link } from 'react-router-dom';
import { flexRender, Row } from '@tanstack/react-table';
import { classNames } from 'shared/lib/classNames/classNames';
import { LestaClanUser } from 'entities/Lesta/model/types/clans';
import cls from './BodyRow.module.scss';

interface IBodyRow {
  className?: string;
  row: Row<LestaClanUser>;
}

export const BodyRow = (props: IBodyRow) => {
  const { className, row } = props;

  return (
    <tr key={row.id} className={classNames(cls.row, {}, [className])}>
      {row.getVisibleCells().map((cell) => (
        <td className={cls.cell} key={cell.id} style={{ minWidth: `${cell.column.getSize()}px` }}>
          <Link className={cls.link} to={`/user/${row.original?.account_id}`}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Link>
        </td>
      ))}
    </tr>
  );
};
