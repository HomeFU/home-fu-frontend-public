import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import styles from './search.module.scss';
import { setFilters } from '..//..//..//redux/SearchCardsCategory/searchCardsCategory';
import { SearchHight } from '..//..//..//types/SearchHight/searchHight';

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) return;

        const searchParams: Partial<SearchHight> = {
            SearchTerm: trimmedQuery,
            CheckInDate: undefined,
            CheckOutDate: undefined,
            Adults: undefined,
            Children: undefined,
            LocationId: undefined
        };

        dispatch(setFilters(searchParams));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchWrapper}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Пошук..."
                value={searchQuery}
                onChange={handleChange}
                aria-label="Пошук"
            />
            <button 
                type="submit" 
                className={styles.searchButton}
                aria-label="Виконати пошук"
            >
                <SearchIcon />
            </button>
        </form>
    );
};

const SearchIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none"
        aria-hidden="true"
    >
        <circle 
            cx="11" 
            cy="11" 
            r="8" 
            stroke="currentColor" 
            strokeWidth="2" 
        />
        <line 
            x1="21" 
            y1="21" 
            x2="16.65" 
            y2="16.65" 
            stroke="currentColor" 
            strokeWidth="2" 
        />
    </svg>
);