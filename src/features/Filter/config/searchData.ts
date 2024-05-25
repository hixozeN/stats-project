export interface ISearchData {
  name: string;
  type: string;
  nameForm: string;
  placeholder: string;
}
export const SearchData: ISearchData = {
  type: 'search',
  name: 'search',
  nameForm: 'searchTanks',
  placeholder: 'Поиск',
};
