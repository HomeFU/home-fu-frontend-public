"use client"

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPlaceType } from "../../../../redux/Filtermenu/filtermenu"
import type { RootState } from "../../../../redux/store"
import style from "./RoomButton.module.scss"

const Room: React.FC = () => {
  const dispatch = useDispatch()
  const { filters } = useSelector((state: RootState) => state.filterMenu)
  
  return (
    <button 
      className={`${style.typeButton} ${filters.placeType === "room" ? style.active : ""}`} 
      onClick={() => dispatch(setPlaceType("room"))}
    >
      Кімната
    </button>
  )
}

export default Room
