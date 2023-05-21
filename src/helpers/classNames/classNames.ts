// Хелпер для создания classNames
/*
  cls - главный класс блока
  mods - булевые модификаторы (opened: true, hovered: true, selected: false and etc)
  additional - дополнительные классы (marginTop5, padding20 and etc)

  Использование:
    <div className={classNames('section-feedback', { visible: true }, [ theme, padding25 ])}>
    </div>
    
  В className запишется основной класс 'section-feedback', модификатор 'visible',
  активная тема, допустим, 'dark' и паддинг 'padding25':
    class='section-feedback visible dark'
*/

type TMods = Record<string, boolean | string>;

export function classNames(cls: string, mods: TMods, additional: string[]): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      .filter(([ className, value ]) => Boolean(value))
      .map(([ className ]) => className)
  ]
    .join(' ');
};