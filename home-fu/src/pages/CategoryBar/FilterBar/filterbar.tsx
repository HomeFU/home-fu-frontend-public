    import { useRef, useState } from "react";
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
        const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
        const [activeFilter, setActiveFilter] = useState<number | null>(null);
        const [startIndex, setStartIndex] = useState<number>(0);

        const scrollToButton = (index: number) => {
            const button = buttonRefs.current[index];
            const container = scrollContainerRef.current;

            if (button && container) {
                const buttonLeft = button.offsetLeft;
                const buttonWidth = button.offsetWidth;
                const containerWidth = container.clientWidth;
                const maxScrollLeft = container.scrollWidth - containerWidth;

                let targetScroll = buttonLeft - containerWidth / 2 + buttonWidth / 2;
                
                // Ограничиваем скролл, чтобы не было резких скачков
                if (targetScroll < 0) targetScroll = 0;
                if (targetScroll > maxScrollLeft) targetScroll = maxScrollLeft;

                container.scrollTo({
                    left: targetScroll,
                    behavior: "smooth",
                });
            }
        };

        const handleFilterClick = (id: number, index: number) => {
            setActiveFilter(id);

            setTimeout(() => {
                scrollToButton(index);
            }, 100); // небольшая задержка перед скроллом
        };

        const handleLastIconClick = () => {
            if (startIndex + 6 < filterOptions.length) {
                setTimeout(() => setStartIndex(startIndex + 1), 150);
            }
        };

        const handleFirstIconClick = () => {
            if (startIndex > 0) {
                setTimeout(() => setStartIndex(startIndex - 1), 150);
            }
        };

        const handleLastVisibleIconClick = (index: number) => {
            if (index === 5 && startIndex + 6 < filterOptions.length) {
                setTimeout(() => setStartIndex(startIndex + 1), 150);
            } else if (index === 0 && startIndex > 0) {
                setTimeout(() => setStartIndex(startIndex - 1), 150);
            }
        };

        return (
            <div className={styles.filterBarContainer}>
                <div className={styles.filterBar} ref={scrollContainerRef}>
                    {filterOptions.slice(startIndex, startIndex + 6).map((option, index) => (
                        <button
                            key={option.id}
                            ref={(el) => { buttonRefs.current[index] = el || null; }}
                            className={`${styles.filterButton} ${activeFilter === option.id ? styles.active : ""}`}
                            onClick={() => handleFilterClick(option.id, index)}
                            onMouseDown={() => handleLastVisibleIconClick(index)} 
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
                            {activeFilter === option.id && <div className={styles.activeIndicator}></div>}
                        </button>
                    ))}
                </div>

                <div className={styles.scrollControls}>
                    <button className={styles.scrollButton} onClick={handleFirstIconClick}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8L10 4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <button className={styles.scrollButton} onClick={handleLastIconClick}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    export default FilterBar;
