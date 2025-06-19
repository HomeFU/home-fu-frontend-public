import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./search.module.scss";
import { setFilters } from "../../../redux/CardsCategoryFilter/filterSlice";
import { RootState } from "../../../redux/store";
import { SearchParams } from "../../../types/SearchParams/searchParams";

type Props = {
    onSearch?: (params: SearchParams) => void;
};

export const Search = ({ onSearch }: Props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const selectedDateArival = useSelector(
        (state: RootState) => state.arrival.selectedDate
    );
    const selectedDateDeparture = useSelector(
        (state: RootState) => state.departure.selectedDate
    );

    const handleSearch = () => {
        setIsLoading(true);

        const filterPayload: SearchParams = {};

        if (searchQuery.trim()) {
            filterPayload.SearchTerm = searchQuery.trim();
        }

        if (selectedDateArival) {
            filterPayload.CheckInDate = selectedDateArival;
        }

        if (selectedDateDeparture) {
            filterPayload.CheckOutDate = selectedDateDeparture;
        }

        dispatch(setFilters(filterPayload));

        if (onSearch) {
            onSearch(filterPayload);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            opacity="0.25"
                        />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 12 12"
                                to="360 12 12"
                                dur="1s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                )}
            </button>
        </div>
    );
};
