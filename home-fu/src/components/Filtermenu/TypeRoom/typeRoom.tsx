"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import style from './roomType.module.scss'
import type { RootState } from "../../../redux/store"

type AccommodationType = {
  id: string
  name: string
  icon: string
}

export const TypeRoom = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const { resetTriggered } = useSelector((state: RootState) => state.filterMenu)

  const accommodationTypes: AccommodationType[] = [
    { id: "house", name: "Будинок", icon: "/src/assets/icons/iconHouse.svg" },
    { id: "apartment", name: "Квартира", icon: "/src/assets/icons/iconApartment.svg" },
    { id: "guesthouse", name: "Гостьовий дім", icon: "/src/assets/icons/iconGuesthouse.svg" },
    { id: "hotel", name: "Готель", icon: "/src/assets/icons/iconHotel.svg" },
  ]

  useEffect(() => {
    if (resetTriggered) {
      setSelectedType(null)
    }
  }, [resetTriggered])

  const selectType = (id: string) => {
    setSelectedType((prev) => (prev === id ? null : id))
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={style.typeRoomContainer}>
      <div className={style.header} onClick={toggleExpanded}>
        <h4 className={style.title}>Тип помешкання</h4>
        <button className={style.toggleButton}>
          <svg className={isExpanded ? style.chevronUp : style.chevron}>
            <path d="M12.5 6L8 10.5L3.5 6" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className={style.optionsContainer}>
          {accommodationTypes.map((type) => (
            <button
              key={type.id}
              className={`${style.typeButton} ${selectedType === type.id ? style.selected : ""}`}
              onClick={() => selectType(type.id)}
            >
              <span className={style.typeIcon}>
              <img src={type.icon} alt={type.name} width={20} height={20} loading="lazy"/>
              </span>
              <span className={style.typeName}>{type.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
