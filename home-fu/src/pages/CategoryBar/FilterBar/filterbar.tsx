import { useRef, useState, useEffect } from "react";
import styles from "./filterbar.module.scss";

const filterOptions = [
    { id: 1, icon: "iconHome.svg", label: "Гарні краєвиди" },
    { id: 2, icon: "iconsmallRoom.svg", label: "Невеликі квартири" },
    { id: 3, icon: "iconbigRoom.svg", label: "Великі квартири" },
    { id: 4, icon: "iconRoom.svg", label: "Кімнати" },
    { id: 5, icon: "iconHostel.svg", label: "Хостели" },
    { id: 6, icon: "iconLuxe.svg", label: "Luxe" },
    { id: 7, icon: "iconcenterCity.svg", label: "У центрі міста" },
    { id: 8, icon: "iconVilage.svg", label: "Сільська місцевість" },
    { id: 9, icon: "iconfromDisagner.svg", label: "Від дизайнера" },
    { id: 10, icon: "iconSea.svg", label: "Біля моря" },
    { id: 11, icon: "iconMansion.svg", label: "Особняки" },
    { id: 12, icon: "iconLegendary.svg", label: "Легендарне" },
];

const FilterBar = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState<number>(filterOptions[0].id);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [hoveredFilter, setHoveredFilter] = useState<number | null>(null);
    const [translateX, setTranslateX] = useState(0);

    useEffect(() => {
        setTranslateX(-startIndex * 120);
    }, [startIndex]);

    const handleFilterClick = (id: number) => {
        if (id !== activeFilter) {
            setActiveFilter(id);
        }
    
        const selectedIndex = filterOptions.findIndex((option) => option.id === id);
    
        if (selectedIndex >= startIndex + 5) {
            handleNext(5);
        } else if (selectedIndex <= startIndex + 1) {
            handlePrev(5);
        }
    };
    

    const handleNext = (step = 5) => {
        if (startIndex + 6 < filterOptions.length) {
            setStartIndex((prev) => Math.min(prev + step, filterOptions.length - 6));
        }
    };

    const handlePrev = (step = 5) => {
        if (startIndex > 0) {
            setStartIndex((prev) => Math.max(prev - step, 0));
        }
    };

    return (
        <div className={styles.filterBarContainer}>
            <div className={styles.filterBarWrapper}>
                <div
                    className={styles.filterBar}
                    ref={scrollContainerRef}
                    style={{ transform: `translateX(${translateX}px)`, transition: "transform 0.5s ease-in-out" }}
                >
                    {filterOptions.map((option) => (
                        <button
                            key={option.id}
                            className={`${styles.filterButton} ${activeFilter === option.id ? styles.active : ""} ${hoveredFilter === option.id ? styles.hover : ""}`}
                            onClick={() => handleFilterClick(option.id)}
                            onMouseEnter={() => setHoveredFilter(option.id)}
                            onMouseLeave={() => setHoveredFilter(null)}
                        >
                            <div className={styles.iconWrapper}>
                                <img
                                    src={`/src/assets/icons/${option.icon}`}
                                    alt={option.label}
                                    className={styles.icon}
                                    width="24"
                                    height="24"
                                />
                            </div>
                            <span className={styles.label}>{option.label}</span>
                            <div className={`${styles.activeIndicator} ${(activeFilter === option.id || hoveredFilter === option.id) ? styles.visible : ""}`} />
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.scrollControls}>
                {startIndex > 0 && (
                    <button className={`${styles.scrollButton} ${styles.scrollLeft}`} onClick={() => handlePrev()}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8L10 4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}

                {startIndex + 6 < filterOptions.length && (
                    <button className={`${styles.scrollButton} ${styles.scrollRight}`} onClick={() => handleNext()}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default FilterBar;
