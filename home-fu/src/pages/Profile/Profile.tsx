import type React from "react"
import styles from "./profile.module.scss"
import cameraIcon from "..//..//assets/icons/cameraIcon.svg"
export const Profile: React.FC = () => {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <h1>Ваш профіль</h1>
                <p className={styles.profileDescription}>
                    Інформацію, яку ви надаєте, буде використовувано на <span className={styles.brandName}>HomeFU</span>, щоб інші
                    гості й господарі мали змогу познайомитися з вами.{" "}
                    <a href="#" className={styles.moreLink}>
                        Докладніше
                    </a>
                </p>
            </div>

            <div className={styles.profileContent}>
                <div className={styles.avatarSection}>
                    <div className={styles.avatar}>
                        <div className={styles.avatarPlaceholder}>I</div>
                    </div>
                    <button className={styles.avatarUpload}>
                        <img src={cameraIcon} alt="Camera" className={styles.cameraIcon} />
                        Додати
                    </button>
                </div>

                <div className={styles.fieldsGrid}>
                    <div className={styles.field}>
                        <input type="text" className={styles.fieldInput} placeholder=" " />
                        <span className={styles.fieldLabel}>Ім'я та прізвище</span>
                    </div>

                    <div className={styles.field}>
                        <input type="email" className={styles.fieldInput} placeholder=" " />
                        <span className={styles.fieldLabel}>Електронна пошта</span>
                    </div>

                    <div className={styles.field}>
                        <input type="tel" className={styles.fieldInput} placeholder=" " />
                        <span className={styles.fieldLabel}>Телефон</span>
                    </div>

                    <div className={styles.field}>
                        <input type="text" className={styles.fieldInput} placeholder=" " />
                        <span className={styles.fieldLabel}>Адреса</span>
                    </div>

                    <div className={styles.field}>
                        <input type="text" className={styles.fieldInput} placeholder=" " />
                        <span className={styles.fieldLabel}>Екстрений контакт</span>
                    </div>
                    <div className={styles.field}>
                        <input type="date" className={styles.fieldInput} placeholder=" " />
                        <span className={styles.fieldLabel}>Дата народження</span>
                    </div>
                    <div className={styles.field}>
                        <select className={styles.fieldInput}>
                            <option value="">Оберіть стать</option>
                            <option value="male">Чоловіча</option>
                            <option value="female">Жіноча</option>
                            <option value="other">Інша</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile