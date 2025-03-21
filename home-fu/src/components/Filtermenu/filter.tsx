"use client"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import style from "./filter.module.scss"
import {
  closeFilterMenu,
  startClosingAnimation,
  setPlaceType,
  setPriceRange,
  incrementRoom,
  decrementRoom,
  resetFilters,
} from "../../redux/Filtermenu/filtermenu"
import type { RootState } from "../../redux/store"

type PlaceType = "any" | "room" | "entire"
type RoomType = "bedrooms" | "beds" | "bathrooms"

const Filter = () => {
  const dispatch = useDispatch()
  const { isOpen, isAnimating, filters } = useSelector((state: RootState) => state.filterMenu)
  const [minPrice, setMinPrice] = useState(filters.priceRange.min)
  const [maxPrice, setMaxPrice] = useState(filters.priceRange.max)
  const [minThumbPosition, setMinThumbPosition] = useState(0)
  const [maxThumbPosition, setMaxThumbPosition] = useState(100)

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

  const handlePriceChange = () => dispatch(setPriceRange({ min: minPrice, max: maxPrice }))

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, isMin: boolean) => {
    const value = Number(e.target.value)
    if (isMin) {
      setMinPrice(value)
      setMinThumbPosition((value / 14000) * 100)
    } else {
      setMaxPrice(value)
      setMaxThumbPosition((value / 14000) * 100)
    }
  }

  const generatePriceBars = () =>
    Array.from({ length: 48 }, (_, i) => {
      const position = i / 48
      const distanceFromCenter = Math.abs(position - 0.5)
      const height = Math.exp(-distanceFromCenter * distanceFromCenter * 10) * 60 + 5
      const isInRange = (i / 48) * 100 >= minThumbPosition && (i / 48) * 100 <= maxThumbPosition
      return <div key={i} className={`${style.sliderBar} ${isInRange ? style.active : ""}`} style={{ height: `${height}px` }} />
    })

  if (!isOpen && !isAnimating) return null

  return (
    <div className={`${style.overlay} ${isAnimating ? style.fadeOut : ""}`} onClick={handleClose}>
      <div className={`${style.filterCard} ${isAnimating ? style.scaleOut : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <button className={style.closeButton} onClick={handleClose}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: 3, overflow: "visible" }}>
              <path d="m6 6 20 20" />
              <path d="m26 6-20 20" />
            </svg>
          </button>
          <h2 className={style.title}>Фільтри</h2>
        </div>

        <div className={style.content}>
          <section className={style.section}>
            <h3 className={style.sectionTitle}>Тип місця для розміщення</h3>
            <div className={style.placeTypeButtons}>
              {(["any", "room", "entire"] as PlaceType[]).map((type) => (
                <button key={type} className={`${style.typeButton} ${filters.placeType === type ? style.active : ""}`} onClick={() => dispatch(setPlaceType(type))}>
                  {type === "any" ? "Будь-який тип" : type === "room" ? "Кімната" : "Помешкання цілком"}
                </button>
              ))}
            </div>
          </section>

          <section className={style.section}>
            <h3 className={style.sectionTitle}>Діапазон цін</h3>
            <p className={style.priceSubtitle}>Ціни за ніч до сплати зборів і податків</p>
            <div className={style.priceSlider}>
              <div className={style.sliderGraph}>{generatePriceBars()}</div>
              <div className={style.sliderContainer}>
                <input type="range" min="0" max="14000" value={minPrice} onChange={(e) => handleSliderChange(e, true)} onMouseUp={handlePriceChange} onTouchEnd={handlePriceChange} className={style.rangeInputMin} />
                <input type="range" min="0" max="14000" value={maxPrice} onChange={(e) => handleSliderChange(e, false)} onMouseUp={handlePriceChange} onTouchEnd={handlePriceChange} className={style.rangeInputMax} />
                <div className={style.sliderTrack} style={{ left: `${minThumbPosition}%`, width: `${maxThumbPosition - minThumbPosition}%` }} />
              </div>
            </div>
            <div className={style.priceInputs}>
              <div className={style.priceInput}>
                <label>Мінімум</label>
                <div className={style.inputWrapper}>
                  <span className={style.currencySymbol}>₴</span>
                  <input
                    type="text"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value.replace(/\D/g, "")))}
                    onBlur={handlePriceChange}
                  />
                </div>
              </div>
              <div className={style.priceInput}>
                <label>Максимум</label>
                <div className={style.inputWrapper}>
                  <span className={style.currencySymbol}>₴</span>
                  <input
                    type="text"
                    value={maxPrice === 14000 ? "14000+" : maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value.replace(/\D/g, "").replace(/\+/g, "")))}
                    onBlur={handlePriceChange}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className={style.section}>
            <h3 className={style.sectionTitle}>Кімнати та спальні місця</h3>
            {(["bedrooms", "beds", "bathrooms"] as RoomType[]).map((roomType) => (
              <div key={roomType} className={style.roomCounter}>
                <div className={style.roomType}>{roomType === "bedrooms" ? "Спальні" : roomType === "beds" ? "Ліжка" : "Ванні кімнати"}</div>
                <div className={style.counterControls}>
                  <button className={style.counterButton} onClick={() => dispatch(decrementRoom(roomType))}>−</button>
                  <span className={style.counterValue}>{filters.rooms[roomType] === 0 ? "Будь-який" : filters.rooms[roomType]}</span>
                  <button className={style.counterButton} onClick={() => dispatch(incrementRoom(roomType))}>+</button>
                </div>
              </div>
            ))}
          </section>

          <section className={style.section}>
            <h3 className={style.sectionTitle}>Зручності</h3>
          </section>
        </div>

        <div className={style.footer}>
          <button className={style.clearButton} onClick={() => { dispatch(resetFilters()); setMinPrice(0); setMaxPrice(14000); setMinThumbPosition(0); setMaxThumbPosition(100); }}>
            Очистити все
          </button>
          <button className={style.showResultsButton}>Показати 1000+ осель</button>
        </div>
      </div>
    </div>
  )
}

export default Filter