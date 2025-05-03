import type React from "react"
import { useState, useRef } from "react"
import styles from "./profile.module.scss"
import cameraIcon from "..//..//assets/icons/cameraIcon.svg"

export const Profile: React.FC = () => {
    const [avatar, setAvatar] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setAvatar(event.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

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
                        {avatar ? (
                            <img src={avatar} alt="User avatar" className={styles.avatarImage} />
                        ) : (
                            <div className={styles.avatarPlaceholder}>I</div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            className={styles.fileInput}
                        />
                    </div>
                    <button 
                        className={styles.avatarUpload}
                        onClick={triggerFileInput}
                        type="button"
                    >
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