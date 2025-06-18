import styles from "./filterbutton.module.scss";
import iconFilter from "../../../assets/icons/iconFilter.svg";
import { useDispatch } from "react-redux";
import { toggleForm } from "../../../redux/Filtermenu/filtermenu";
import { Filter } from "../../../components/Filtermenu/filter";

export const FilterButton = () => {
    const dispatch = useDispatch();

    return (
        <>
            <button className={`${styles.registerbutton} ${styles.filterWrapper}`} onClick={() => dispatch(toggleForm())}>
            <img src={iconFilter} alt="iconFilter" className={styles.filterIcon} loading="lazy"/>
            <span className={styles.filterText}>Фільтри</span>
            </button>
            <Filter></Filter>
        </>
    );
};

