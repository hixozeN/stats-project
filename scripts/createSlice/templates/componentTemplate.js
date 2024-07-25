const interfaceConst = 'interface';

module.exports = (componentName) => `import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './${componentName}.module.scss';

${interfaceConst} ${componentName}Props {
  className?: string;
}

export const ${componentName} = memo((props: ${componentName}Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.${componentName}, {}, [className])}>
    </div>
  );
});
`;
