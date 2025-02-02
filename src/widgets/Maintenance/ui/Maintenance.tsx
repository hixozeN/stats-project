import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import MaintenanceIcon from 'shared/assets/icons/maintenance.svg';
import { links } from '../config/links';
import { useGetMaintenanceDataQuery } from '../api/maintenanceApi';
import cls from './Maintenance.module.scss';

interface MaintenanceProps {
  className?: string;
}

export const Maintenance = (props: MaintenanceProps) => {
  const { className } = props;
  const { t } = useTranslation('maintenance');
  const { data } = useGetMaintenanceDataQuery(null);
  const { title, message } = data;

  return (
    <div className={classNames(cls.Maintenance, {}, [className])}>
      <MaintenanceIcon />
      <h1 className={cls.title}>{title}</h1>
      <span className={cls.message}>{message}</span>
      <div>
        <div className={cls.socials}>
          {links.map(({
            link,
            label,
            icon,
            text,
          }) => (
            <Link
              className={classNames(cls.link, {}, ['link-hovered'])}
              to={link}
              target="_blank"
              aria-label={t(`${label}`)}
              key={link}
            >
              {icon}
              <span className={cls.text}>{t(`${text}`)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
