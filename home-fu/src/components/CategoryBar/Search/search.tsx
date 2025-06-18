import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styles from "./search.module.scss";
import { setFilters } from "..//..//..//redux/SearchCardsCategory/searchCardsCategory";

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [_, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const handleSearch = () => {
        const query = searchQuery.trim();
        if (!query) return;
        
        setIsLoading(true);
        
        // 1. Отправляем в Redux (как было)
        dispatch(setFilters({ SearchTerm: query }));
        console.log("Searching for:", query);

        // 2. Обновляем URL с закодированным параметром
        const encodedQuery = encodeURIComponent(query);
        setSearchParams({ SearchTerm: encodedQuery });

        // 3. Принудительное обновление URL для браузера
        window.history.replaceState(
            null,
            '',
            `?SearchTerm=${encodedQuery}`
        );

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={styles.searchWrapper}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Пошук..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            
            <button 
                className={styles.searchButton} 
                onClick={handleSearch}
                disabled={isLoading}
            >
                {isLoading ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4">
                            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                        </path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                )}
            </button>
        </div>
    );
};