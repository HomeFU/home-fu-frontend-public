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
    const [translateX, setTranslateX] = useState(0);
    const [showLeftButton, setShowLeftButton] = useState(false);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        setTranslateX(-startIndex * 120);
        setShowLeftButton(startIndex > 0);
    }, [startIndex]);

    const handleFilterClick = (id: number) => {
        setActiveFilter(id);
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
    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true);
        setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
        setScrollLeft(translateX);
    };
    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        const x = "touches" in e ? e.touches[0].clientX : e.clientX;
        const walk = x - startX;
        const newTranslateX = scrollLeft + walk;

        setTranslateX(newTranslateX);
        setShowLeftButton(newTranslateX < 0); 
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        const newIndex = Math.round(-translateX / 120); 
        setStartIndex(newIndex);
    };

    return (
        <div className={styles.filterBarContainer}>
            <div className={styles.filterBarWrapper}>
                <div
                    className={styles.filterBar}
                    ref={scrollContainerRef}
                    style={{ transform: `translateX(${translateX}px)`, transition: isDragging ? "none" : "transform 0.5s ease-in-out" }}
                    onMouseDown={handleTouchStart}
                    onMouseMove={handleTouchMove}
                    onMouseUp={handleTouchEnd}
                    onMouseLeave={handleTouchEnd}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {filterOptions.map((option) => (
                        <button
                            key={option.id}
                            className={`${styles.filterButton} ${activeFilter === option.id ? styles.active : ""}`}
                            onClick={() => handleFilterClick(option.id)}
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
                            <div className={`${styles.activeIndicator} ${activeFilter === option.id ? styles.visible : ""}`} />
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.scrollControls}>
                {showLeftButton && (
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
