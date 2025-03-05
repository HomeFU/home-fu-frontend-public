import styles from "./filterbutton.module.scss";
import iconFilter from "../../../assets/icons/iconFilter.svg"

const FilterButton: React.FC = () => {

    return (
        <div className={styles.filterWrapper}>
            <img src={iconFilter} alt="iconFilter" className={styles.filterIcon} />
            <span className={styles.filterText}>Фільтри</span>
        </div>
    );
};

export default FilterButton;