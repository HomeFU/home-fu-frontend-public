"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import styles from "./profile.module.scss"
import cameraIcon from "..//..//assets/icons/cameraIcon.svg"
import Select, { type SingleValue } from "react-select"
import { HeaderSite } from "..//..//components/Header/HeaderSite/headerSite"
import { FooterSite } from "../../components/Footer/FooterSite/footerSite"
import { UserModel } from "../../types/Profile/fullUsedData";
import { GetFullInfoAboutUser } from "../../api/Profile/userData"
import { useFullInfoUser } from "../../hooks/useFullUserInfo"
import NoUserPhoto from "../../assets/images/noPhotoUser.jpg";

type Option = {
  value: string
  label: string
}

export const Profile: React.FC = () => {

  const token = localStorage.getItem('token') as string;

  const options = [
    { value: 'Man', label: 'Чоловік' },
    { value: 'Woman', label: 'Жінка' },
    { value: 'Other', label: 'Інше' },
  ];

  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const handleChange = (selected: SingleValue<Option>) => {
    setSelectedOption(selected)
  }

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

  const {
    data: fullInfoUserData = [],
  } = useFullInfoUser(token);

  return (
    <>
      <HeaderSite />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <form className={styles.profileContent}>
            <div className={styles.wrapperProfileContent}>
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  {
                    fullInfoUserData.profileImageUrl !== null
                    ?  <img
                    src={`https://homefuserverback.azurewebsites.net${fullInfoUserData.profileImageUrl || '/placeholder.svg'}`}
                    alt="User avatar"
                    className={styles.avatarImage}/>
                    : <img className={styles.userImage} loading="lazy" src={NoUserPhoto} alt="userPhoto" />
                  }
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className={styles.fileInput}
                  />
                </div>
                <button className={styles.avatarUpload} onClick={triggerFileInput} type="button">
                  <img src={cameraIcon || "/placeholder.svg"} alt="Camera" className={styles.cameraIcon} />
                  Додати
                </button>
              </div>
              <div className={styles.contentSection}>
                <div className={styles.profileHeader}>
                  <h1>Ваш профіль</h1>
                  <p className={styles.profileDescription}>
                    Інформацію, яку ви надаєте, буде використовувано на <span className={styles.brandName}>HomeFU</span>, щоб
                    інші гості й господарі мали змогу познайомитися з вами.{" "}
                    <a href="#" className={styles.moreLink}>
                      Докладніше
                    </a>
                  </p>
                </div>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                      <input value={fullInfoUserData.firstName} type="text" className={styles.fieldInput} placeholder=" " />
                      <span className={styles.fieldLabel}>Ім'я</span>
                    </div>
                    <div className={styles.field}>
                      <input value={fullInfoUserData.lastName} type="text" className={styles.fieldInput} placeholder=" " />
                      <span className={styles.fieldLabel}>Прізвище</span>
                    </div>
                  <div className={styles.field}>
                    <input type="email" value={fullInfoUserData.email} className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Електронна пошта</span>
                  </div>

                  <div className={styles.field}>
                    <input value={fullInfoUserData.phoneNumber} type="tel" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Телефон</span>
                  </div>

                  <div className={styles.field}>
                    <input  value={fullInfoUserData.address} type="text" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Адреса</span>
                  </div>

                  <div className={styles.field}>
                    <input value={fullInfoUserData.emergencyContactName} type="text" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Ім'я екстреного контакту</span>
                  </div>

                  <div className={styles.field}>
                    <input value={fullInfoUserData.emergencyContactPhone} type="text" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Екстрений контакт</span>
                  </div>

                  <div className={styles.field}>
                    <Select
                      value={selectedOption}
                      onChange={handleChange}
                      options={options}
                      placeholder="Оберіть стать"
                      styles={{
                        control: (base) => ({
                          ...base,
                          border: "none",
                          borderBottom: "1px solid #ccc",
                          borderRadius: 0,
                          boxShadow: "none",
                          backgroundColor: "transparent",
                          minHeight: "40px",
                          padding: 0,
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          padding: 0,
                        }),
                      }}
                    />
                  </div>

                  <div className={`${styles.field} ${styles.fieldHappyDate}`}>
                    <input value={fullInfoUserData.birthDate?.slice(0, 10)} type="date" className={styles.fieldInput} placeholder=" "/>
                    <span className={styles.fieldLabel}>Дата народження</span>
                  </div>
                </div>
                <button type="submit" className={styles.updateButton}>Update</button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <FooterSite />
    </>
  )
}

export default Profile
