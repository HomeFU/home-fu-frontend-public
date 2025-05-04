"use client"

import type React from "react"
import { useState, useRef, forwardRef } from "react"
import styles from "./profile.module.scss"
import cameraIcon from "..//..//assets/icons/cameraIcon.svg"
import Select, { type SingleValue } from "react-select"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { uk } from "date-fns/locale/uk"

registerLocale("uk", uk)

type Option = {
  value: string
  label: string
}


interface CustomInputProps {
  value?: string
  onClick?: () => void
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(({ value, onClick }, ref) => (
  <div className={styles.customDateInput} onClick={onClick} ref={ref}>
    <input 
      type="text" 
      className={styles.fieldInput} 
      value={value || ""} 
      readOnly 
      placeholder=" "
    />
    <span className={styles.fieldLabel}>Дата народження</span>
  </div>
));

CustomInput.displayName = "CustomInput";

export const Profile: React.FC = () => {
  const options = [
    { value: "man", label: "Чоловіча" },
    { value: "woman", label: "Жіноча" },
    { value: "other", label: "Інша" },
  ]

  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [birthDate, setBirthDate] = useState<Date | null>(null)

  const handleChange = (selected: SingleValue<Option>) => {
    setSelectedOption(selected)
    //console.log(selected?.value)
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
              <img src={avatar || "/placeholder.svg"} alt="User avatar" className={styles.avatarImage} />
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
          <button className={styles.avatarUpload} onClick={triggerFileInput} type="button">
            <img src={cameraIcon || "/placeholder.svg"} alt="Camera" className={styles.cameraIcon} />
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
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="dd.MM.yyyy"
              locale="uk"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              popperClassName={styles.datePickerPopper}
              popperPlacement="bottom-start"
              customInput={<CustomInput />}
            />
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
        </div>
      </div>
    </div>
  )
}

export default Profile
