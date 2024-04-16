/* eslint-disable */
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TermsOfUse.module.scss';

interface ITermsOfUse {
  className?: string,
  isOpen: boolean,
  handleClose: () => void;
}
export const TermsOfUse = (props: ITermsOfUse) => {
  const { className, isOpen, handleClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={classNames(cls.TermsOfUse, {}, [className])}>
        <h1 className={cls.title}>Условия&nbsp;использования сервиса&nbsp;статистики&nbsp;игроков для&nbsp;игры&nbsp;Tanks&nbsp;Blitz:</h1>
        <ol className={cls.list}>
          <li className={cls.item}>
            <span className={cls.bold}>Общее положение:</span>
            Этот сервис статистики игроков игры Tanks Blitz предоставляется как инструмент
            для отслеживания и анализа игровой статистики и не имеет связи или принадлежности
            к ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ &quot;ЛЕСТА ГЕЙМС ЭДЖЕНСИ&quot;.
          </li>
          <li className={cls.item}>
            <span className={cls.bold}>Права и ответственность пользователя: </span>
            Настоящий сервис предоставляется исключительно для личного пользования.
            Пользователь несет полную ответственность за любые действия, произведенные с использованием данного сервиса.
          </li>
          <li className={cls.item}>
            <span className={cls.bold}>Конфиденциальность: </span>
            Сервис обязуется соблюдать конфиденциальность данных игроков
            и не передавать их третьим лицам без согласия пользователя.
          </li>
          <li className={cls.item}>
            <span className={cls.bold}>Отказ от ответственности: </span>
            Сервис не несет ответственности за возможные ошибки в отображаемых данных,
            а также за любые убытки или повреждения, возникшие в результате использования данного сервиса.
          </li>
          <li className={cls.item}>
            <span className={cls.bold}>Изменения в условиях использования: </span>
            Сервис оставляет за собой право вносить изменения
            в условия использования без предварительного уведомления пользователей.
          </li>
          <li className={cls.item}>
            <span className={cls.bold}>Сотрудничество и коммерция: </span>
            Сотрудничество с проектом осуществляется <span className={cls.bold}>только через почту</span>, указанную в п. Контактная информация.
            Любые другие источники связи носят исключительно информационный характер и не предназначены для обсуждения коммерческих вопросов.
            Будьте бдительны.
          </li>
          <li className={cls.item}>
            <span className={cls.bold}>Контактная информация: </span>
            Для связи с сервисом и разрешения возможных вопросов, пользователи могут обращаться по электронной почте:
            {' '}
            <a href="mailto:contact@blitzstats.ru" className={cls.link}>contact@blitzstats.ru</a>
          </li>
        </ol>
      </div>
    </Modal>
  );
};
