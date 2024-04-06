import React, { useState } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';

interface ISearchDesktop {
  isMobile: boolean,
}
export const SearchDesktop = (props: ISearchDesktop) => {
  const {
    isMobile,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const resultsRef = React.useRef<HTMLInputElement>(null);
  return (
    <div>
      <SearchForm isOpen={isOpen} setIsOpen={setIsOpen} isMobile={isMobile} resultsRef={resultsRef} />
      <SearchResults isOpen={isOpen} setIsOpen={setIsOpen} isMobile={isMobile} resultsRef={resultsRef} />
    </div>
  );
};
