import styles from './Search.module.scss';

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  return (
    <div>
      <div className={styles.row}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search contact"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
};
export default Search;
