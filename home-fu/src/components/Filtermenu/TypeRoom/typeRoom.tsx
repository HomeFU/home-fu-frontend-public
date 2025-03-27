"use client"

import type React from "react"
import { useState } from "react"
import style from "./typeroom.module.scss"

type AccommodationType = {
  id: string
  name: string
  icon: string
}

const TypeRoom: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const accommodationTypes: AccommodationType[] = [
    { id: "house", name: "Будинок", icon: "/src/assets/icons/iconHouse.svg" },
    { id: "apartment", name: "Квартира", icon: "/src/assets/icons/iconApartment.svg" },
    { id: "guesthouse", name: "Гостьовий дім", icon: "/src/assets/icons/iconGuesthouse.svg" },
    { id: "hotel", name: "Готель", icon: "/src/assets/icons/iconHotel.svg" },
  ]

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
                <img src={type.icon || "/placeholder.svg"} alt={type.name} width={20} height={20} />
              </span>
              <span className={style.typeName}>{type.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TypeRoom

