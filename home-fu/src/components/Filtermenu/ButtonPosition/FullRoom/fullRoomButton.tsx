"use client"
import { useDispatch, useSelector } from "react-redux"
import { setPlaceType } from "../../../../redux/Filtermenu/filtermenu"
import type { RootState } from "../../../../redux/store"
import style from "./fullRoomButton.module.scss"

const FullRoom = () => {
  const dispatch = useDispatch()
  const { filters } = useSelector((state: RootState) => state.filterMenu)
  
  return (
    <button 
      className={`${style.typeButton} ${filters.placeType === "entire" ? style.active : ""}`} 
      onClick={() => dispatch(setPlaceType("entire"))}
    >
      Помешкання цілком
    </button>
  )
}

export default FullRoom
