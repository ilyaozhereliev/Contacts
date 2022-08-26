import React, { FC } from 'react';

import styles from './Search.module.scss';

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

const Search: FC<SearchProps> = ({ search, setSearch }) => (
  <div>
    <div className={styles.row}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search contact"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        />
        <i className="fa-solid fa-magnifying-glass" />
      </div>
    </div>
  </div>
);
export default React.memo(Search);
