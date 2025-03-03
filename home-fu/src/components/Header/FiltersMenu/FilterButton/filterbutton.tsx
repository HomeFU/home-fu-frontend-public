import { useState } from "react";
import styles from "./filterbutton.module.scss";
import iconFilter from "../../../../assets/icons/iconFilter.svg";

const FilterButton: React.FC = () => {
    const [active, setActive] = useState(false);

    return (
        <div className={`${styles.filterWrapper} ${active ? styles.active : ""}`} onClick={() => setActive(!active)}>
            <img src={iconFilter} alt="Фільтри" className={styles.filterIcon} />
            <span className={styles.filterText}>Фільтри</span>
        </div>
    );
};

export default FilterButton;