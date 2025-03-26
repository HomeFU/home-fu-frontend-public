"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import style from "./filter.module.scss"
import { closeFilterMenu, startClosingAnimation, resetFilters } from "../../redux/Filtermenu/filtermenu"
import type { RootState } from "../../redux/store"
import ButtonType from "./ButtonPosition/ButtonType/ButtonTypes"
import Room from "./ButtonPosition/Room/RoomButton"
import FullRoom from "../Filtermenu/ButtonPosition/FullRoom/fullRoomButton"
import PriceRange from "../Filtermenu/PriceRange/RriceRangeScroll"
import RoomBedroom from "../Filtermenu//RoomBedroom/RoomBedroomButton"
import Amenities from "../Filtermenu/Amenities/Amenities"
import Armoring from "../Filtermenu/Armoring/Armoring"

const Filter = () => {
  const dispatch = useDispatch()
  const { isOpen, isAnimating } = useSelector((state: RootState) => state.filterMenu)

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    document.body.style.paddingRight = isOpen ? `${scrollbarWidth}px` : "0"
    return () => {
      document.body.style.overflow = "auto"
      document.body.style.paddingRight = "0"
    }
  }, [isOpen])

  const handleClose = () => {
    dispatch(startClosingAnimation())
    setTimeout(() => dispatch(closeFilterMenu()), 300)
  }

  if (!isOpen && !isAnimating) return null

  return (
    <div className={`${style.overlay} ${isAnimating ? style.fadeOut : ""}`} onClick={handleClose}>
     <div className={`${style.filterCard} ${isAnimating ? style.scaleOut : ""}`} onClick={(e) => e.stopPropagation()}>
    <div className={style.header}>
      <button className={style.closeButton} onClick={handleClose} aria-label="Закрити">
        <svg viewBox="0 0 32 32" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none">
          <path d="M6 6 L26 26" />
          <path d="M26 6 L6 26" />
        </svg>
      </button>
      <h2 className={style.title}>Фільтри</h2>
    </div>

        <div className={style.content}>
          <section className={style.section}>
            <h3 className={style.sectionTitle}>Тип місця для розміщення</h3>
            <div className={style.placeTypeButtons}>
              <ButtonType />
              <Room />
              <FullRoom />
            </div>
          </section>

          <section className={style.section}>
            <PriceRange />
          </section>

          <section className={style.section}>
            <RoomBedroom />
          </section>

          <section className={style.section}>
            <Amenities />
          </section>

          <section className={style.section}>
            <Armoring/>
          </section>
          
        </div>

        <div className={style.footer}>
          <button
            className={style.clearButton}
            onClick={() => {
              dispatch(resetFilters())
            }}
          >
            Очистити все
          </button>
          <button className={style.showResultsButton}>Показати 1000+ осель</button>
        </div>
      </div>
    </div>
  )
}

export default Filter