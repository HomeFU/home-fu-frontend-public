"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import styles from "./Armoring.module.scss"
import type { RootState } from "../../../redux/store"

const css = styles as Record<string, string>
type BookingOption = {
  id: string
  name: string
  icon: string
  description?: string
}
type BookingCategory = {
  id: string
  title: string
  options: BookingOption[]
}

const Armoring: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const { resetTriggered } = useSelector((state: RootState) => state.filterMenu)
  const bookingCategories: BookingCategory[] = [
    {
      id: "booking",
      title: "Варіанти бронювання",
      options: [
        {
          id: "instant",
          name: "Миттєве бронювання",
          icon: "/src/assets/icons/iconInstant.svg",
        },
        {
          id: "selfCheckin",
          name: "Самостійне прибуття",
          icon: "/src/assets/icons/iconSelfCheckin.svg",
        },
        {
          id: "pets",
          name: "Можна перебувати з домашніми тваринами",
          icon: "/src/assets/icons/iconPets.svg",
        },
      ],
    },
    {
      id: "special",
      title: "Особливі помешкання",
      options: [
        {
          id: "topRated",
          name: "Вибір гостей",
          icon: "/src/assets/icons/iconTopRated.svg",
          description: "Помешкання, що мають найбільшу кількість позитивних відгуків на Airbnb",
        },
      ],
    },
  ]
  useEffect(() => {
    if (resetTriggered) {
      setSelectedOptions([])
    }
  }, [resetTriggered])
  const toggleOption = (id: string) => {
    setSelectedOptions((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }
  const renderOptionButton = (option: BookingOption) => (
    <button
      key={option.id}
      className={`${css.optionButton} ${selectedOptions.includes(option.id) ? css.selected : ""}`}
      onClick={() => toggleOption(option.id)}
    >
      <span className={css.optionIcon}>
        <img src={option.icon || "/placeholder.svg"} alt={option.name} width={18} height={18} />
      </span>
      <span className={css.optionName}>{option.name}</span>
    </button>
  )
  const renderSpecialOption = (option: BookingOption) => (
    <div key={option.id} className={css.specialOption}>
      <button
        className={`${css.optionButton} ${selectedOptions.includes(option.id) ? css.selected : ""}`}
        onClick={() => toggleOption(option.id)}
      >
        <span className={css.optionIcon}>
          <img src={option.icon || "/placeholder.svg"} alt={option.name} width={18} height={18} />
        </span>
        <div className={css.optionContent}>
          <span className={css.optionName}>{option.name}</span>
          {option.description && <p className={css.optionDescription}>{option.description}</p>}
        </div>
      </button>
    </div>
  )

  return (
    <>
      {bookingCategories.map((category) => (
        <div key={category.id} className={css.bookingCategory}>
          <h4 className={css.categoryTitle}>{category.title}</h4>
          <div className={css.optionsContainer}>
            {category.id === "special"
              ? category.options.map(renderSpecialOption)
              : category.options.map(renderOptionButton)}
          </div>
        </div>
      ))}
    </>
  )
}

export default Armoring