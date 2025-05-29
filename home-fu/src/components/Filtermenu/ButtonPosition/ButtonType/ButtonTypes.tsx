"use client"

import { useDispatch, useSelector } from "react-redux"
import { setPlaceType } from "../../../../redux/Filtermenu/filtermenu"
import type { RootState } from "../../../../redux/store"
import style from "./ButtonTypes.module.scss"

const ButtonType = () => {
    const dispatch = useDispatch()
    const { filters } = useSelector((state: RootState) => state.filterMenu)
  
    return (
      <button
        className={`${style.typeButton} ${filters.placeType === "any" ? style.active : ""}`}
        onClick={() => dispatch(setPlaceType("any"))}
      >
        Будь-який тип
      </button>
    )
  }
  
  export default ButtonType
  