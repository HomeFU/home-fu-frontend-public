import { useState } from "react";
import styles from "./sumbutton.module.scss";

export const SumButton = () => {
    const [active, setActive] = useState(false);

    return (
        <div className={`${styles.switchWrapper} ${active ? styles.active : ""}`} onClick={() => setActive(!active)}>
            <span className={styles.switchText}>Загальна сума до оподаткування</span>
            <div className={styles.switchToggle}></div>
        </div>
    );
};

