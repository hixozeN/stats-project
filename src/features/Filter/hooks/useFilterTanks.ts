import { useSelector } from 'react-redux';
import { getLestaUserTanks } from 'entities/Lesta';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import { getCheckboxesFilterState } from '../model/selectors';

export const useFilterTanks = () => {
  const checkboxes = useSelector(getCheckboxesFilterState);
  const tanks = useSelector(getLestaUserTanks);
  const tanksData: TUserTanks[] = tanks.length !== 0 ? tanks : JSON.parse(localStorage.getItem('tanks'));

  const filter = Object.keys(checkboxes).reduce((result, item) => {
    const data = Object.entries(checkboxes[`${item}`]).map(
      ([key, value]) => (value && key),
    );
    const param = item.split('.');

    if (data.every((itemData) => !itemData)) {
      return result;
    }

    return result
      .filter((tank: {[key: string]:any}) => data
        .find((tankItem) => tankItem === tank[`${param[0]}`][`${param[1]}`].toString()));
  }, tanksData);

  return filter;
};
