import styles from "./filterbutton.module.scss";
import iconFilter from "../../../assets/icons/iconFilter.svg";
import { useDispatch } from "react-redux";
import { toggleForm } from "../../../redux/Filtermenu/filtermenu";

const FilterButton: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <button className={`${styles.registerbutton} ${styles.filterWrapper}`} onClick={() => dispatch(toggleForm())}>
            <img src={iconFilter} alt="iconFilter" className={styles.filterIcon} />
            <span className={styles.filterText}>Фільтри</span>
        </button>
    );
};

export default FilterButton;
