"use client"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { incrementRoom, decrementRoom } from "../../../redux/Filtermenu/filtermenu"
import type { RootState } from "../../../redux/store"
import style from "./RoomBedroomButton.module.scss"

type RoomType = "bedrooms" | "beds" | "bathrooms"

const RoomBedroom: React.FC = () => {
  const dispatch = useDispatch()
  const { filters } = useSelector((state: RootState) => state.filterMenu)

  const roomTypes: { type: RoomType; label: string }[] = [
    { type: "bedrooms", label: "Спальні" },
    { type: "beds", label: "Ліжка" },
    { type: "bathrooms", label: "Ванні кімнати" },
  ]

  return (
    <>
      <h3 className={style["sectionTitle"]}>Кімнати та спальні місця</h3>
      {roomTypes.map(({ type, label }) => (
        <div key={type} className={style["roomCounter"]}>
          <div className={style["roomType"]}>{label}</div>
          <div className={style["counterControls"]}>
            <button className={style["counterButton"]} onClick={() => dispatch(decrementRoom(type))}>
              −
            </button>
            <span className={style["counterValue"]}>
              {filters.rooms[type] === 0 ? "Будь-який" : filters.rooms[type]}
            </span>
            <button className={style["counterButton"]} onClick={() => dispatch(incrementRoom(type))}>
              +
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default RoomBedroom

