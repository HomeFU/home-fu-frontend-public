"use client"

import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPriceRange } from "../../../redux/Filtermenu/filtermenu"
import type { RootState } from "../../../redux/store"
import style from "./RriceRangeScroll.module.scss"

export const PriceRange = () => {
  const dispatch = useDispatch()
  const { filters } = useSelector((state: RootState) => state.filterMenu)
  const [minPrice, setMinPrice] = useState(filters.priceRange.min)
  const [maxPrice, setMaxPrice] = useState(filters.priceRange.max)
  const [minThumbPosition, setMinThumbPosition] = useState(0)
  const [maxThumbPosition, setMaxThumbPosition] = useState(100)

  useEffect(() => {
    setMinPrice(filters.priceRange.min)
    setMaxPrice(filters.priceRange.max)
    setMinThumbPosition((filters.priceRange.min / 14000) * 100)
    setMaxThumbPosition((filters.priceRange.max / 14000) * 100)
  }, [filters.priceRange])

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
      return (
        <div
          key={i}
          className={`${style.sliderBar} ${isInRange ? style.active : ""}`}
          style={{ height: `${height}px` }}
        />
      )
    })

  return (
    <>
      <h3 className={style.sectionTitle}>Діапазон цін</h3>
      <p className={style.priceSubtitle}>Ціни за ніч до сплати зборів і податків</p>
      <div className={style.priceSlider}>
        <div className={style.sliderGraph}>{generatePriceBars()}</div>
        <div className={style.sliderContainer}>
          <input
            type="range"
            min="0"
            max="14000"
            value={minPrice}
            onChange={(e) => handleSliderChange(e, true)}
            onMouseUp={handlePriceChange}
            onTouchEnd={handlePriceChange}
            className={style.rangeInputMin}
          />
          <input
            type="range"
            min="0"
            max="14000"
            value={maxPrice}
            onChange={(e) => handleSliderChange(e, false)}
            onMouseUp={handlePriceChange}
            onTouchEnd={handlePriceChange}
            className={style.rangeInputMax}
          />
          <div
            className={style.sliderTrack}
            style={{ left: `${minThumbPosition}%`, width: `${maxThumbPosition - minThumbPosition}%` }}
          />
        </div>
      </div>
      <div className={style.priceInputs}>
        <div className={style.priceInput}>
          <label>Мінімум</label>
          <div className={style.inputWrapper}>
            <span className={style.currencySymbol}>$</span>
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
            <span className={style.currencySymbol}>$</span>
            <input
              type="text"
              value={maxPrice === 14000 ? "14000+" : maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value.replace(/\D/g, "").replace(/\+/g, "")))}
              onBlur={handlePriceChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}
