import { flexRender, HeaderGroup } from '@tanstack/react-table';
import IconChevron from 'shared/assets/icons/button/chevron-down.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { LestaClanUser } from 'entities/Lesta/model/types/clans';
import cls from './HeaderRow.module.scss';

interface IHeaderRow {
  className?: string;
  headerGroup: HeaderGroup<LestaClanUser>;
}

export const HeaderRow = (props: IHeaderRow) => {
  const { className, headerGroup } = props;

  return (
    <tr key={headerGroup.id} className={classNames(cls.headerRow, {}, [className])}>
      {headerGroup.headers.map((header) => (
        <th key={header.id} colSpan={header.colSpan} className={cls.header}>
          <div
            {...{
              className: `${header.column.getCanSort()} ${cls.headerCell}`,
              onClick: header.column.getToggleSortingHandler(),
            }}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            <span className={cls.buttonZone}>
              {header.column.getIsSorted() === 'desc' || header.column.getIsSorted() !== 'asc' ? (
                <IconChevron
                  className={classNames(
                    cls.button,
                    {
                      [cls.buttonActive]: header.column.getIsSorted() === 'desc',
                    },
                    []
                  )}
                />
              ) : (
                <IconChevron
                  className={classNames(
                    cls.button,
                    {
                      [cls.buttonActive]: header.column.getIsSorted() === 'asc',
                    },
                    [cls.buttonUp]
                  )}
                />
              )}
            </span>
          </div>
        </th>
      ))}
    </tr>
  );
};
