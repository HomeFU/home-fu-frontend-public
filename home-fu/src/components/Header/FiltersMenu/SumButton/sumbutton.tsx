import React, { useState } from "react";
import styles from "./sumbutton.module.scss";

const SumButton: React.FC = () => {
    const [active, setActive] = useState(false);

    return (
        <div className={`${styles.switchWrapper} ${active ? styles.active : ""}`} onClick={() => setActive(!active)}>
            <span className={styles.switchText}>Загальна сума до оподаткування</span>
            <div className={styles.switchToggle}></div>
        </div>
    );
};

export default SumButton;
