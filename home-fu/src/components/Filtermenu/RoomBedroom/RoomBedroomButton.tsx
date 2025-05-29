"use client"

import { useDispatch, useSelector } from "react-redux"
import { incrementRoom, decrementRoom } from "../../../redux/Filtermenu/filtermenu"
import type { RootState } from "../../../redux/store"
import style from "./RoomBedroomButton.module.scss"

type RoomType = "bedrooms" | "beds" | "bathrooms"

const RoomBedroom = () => {
  const dispatch = useDispatch()
  const { filters } = useSelector((state: RootState) => state.filterMenu)

  const roomTypes: { type: RoomType; label: string }[] = [
    { type: "bedrooms", label: "Спальні" },
    { type: "beds", label: "Ліжка" },
    { type: "bathrooms", label: "Ванні кімнати" },
  ]

  const handleIncrement = (type: RoomType) => {
    if (filters.rooms[type] < 8) {
      dispatch(incrementRoom(type))
    }
  }

  const handleDecrement = (type: RoomType) => {
    if (filters.rooms[type] > 0) {
      dispatch(decrementRoom(type))
    }
  }

  const getDisplayValue = (value: number) => {
    if (value === 0) return "Будь-який"
    if (value === 8) return "8+"
    return `${value}+`
  }

  return (
    <>
      <h3 className={style.sectionTitle}>Кімнати та спальні місця</h3>
      {roomTypes.map(({ type, label }) => (
        <div key={type} className={style.roomCounter}>
          <div className={style.roomType}>{label}</div>
          <div className={style.counterControls}>
            <button
              className={`${style.counterButton} ${filters.rooms[type] === 0 ? style.faded : ""}`}
              onClick={() => handleDecrement(type)}
              disabled={filters.rooms[type] === 0}
            >
              −
            </button>
            <span className={style.counterValue}>{getDisplayValue(filters.rooms[type])}</span>
            <button
              className={`${style.counterButton} ${filters.rooms[type] === 8 ? style.faded : ""}`}
              onClick={() => handleIncrement(type)}
              disabled={filters.rooms[type] === 8}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default RoomBedroom