import { useSelector } from 'react-redux';
import { getLestaUserTanks, getUserSessionTanks } from 'entities/Lesta';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import {
  getCheckboxesFilterState,
} from 'features/Filter/model/selectors/getCheckboxesFilterState/getCheckboxesFilterState';

export const useFilterTanks = (tab:number) => {
  const checkboxes = useSelector(getCheckboxesFilterState);
  const tanks = useSelector(getLestaUserTanks);
  const sessionTanks = useSelector(getUserSessionTanks);

  const getTanksList = ():TUserTanks[] => {
    if (tab === 0) {
      return tanks;
    } if (tab === 1) {
      return sessionTanks;
    }
    return [];
  };

  const filter = Object.keys(checkboxes).reduce((result, item) => {
    const data = Object.entries(checkboxes[`${item}`]).map(
      ([key, value]) => (value && key),
    );
    const [dataParam, param] = item.split('.');

    if (data.every((itemData) => !itemData)) {
      return result;
    }
    // ToDo: избавиться от any
    return result
      .filter((tank: {[key: string]:any}) => data
        .find((tankItem) => tankItem === tank[dataParam][param].toString()));
  }, getTanksList());

  return { filter };
};
