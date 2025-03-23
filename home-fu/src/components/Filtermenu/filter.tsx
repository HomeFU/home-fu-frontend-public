import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import style from "./filter.module.scss"
import { closeFilterMenu,  setPlaceType, setPriceRange, incrementRoom, decrementRoom, resetFilters,}
from "../../redux/Filtermenu/filtermenu"

type PlaceType = "any" | "room" | "entire"
type RoomType = "bedrooms" | "beds" | "bathrooms"

export const Filter = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.filterMenu.isOpen)
  const filters = useSelector((state) => state.filterMenu.filters)
  const [minPrice, setMinPrice] = useState(filters.priceRange.min)
  const [maxPrice, setMaxPrice] = useState(filters.priceRange.max)
  const [minThumbPosition, setMinThumbPosition] = useState(0)
  const [maxThumbPosition, setMaxThumbPosition] = useState(100)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handlePlaceTypeChange = (type: PlaceType) => {
    dispatch(setPlaceType(type))
  }

  const handlePriceChange = () => {
    dispatch(setPriceRange({ min: minPrice, max: maxPrice }))
  }

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setMinPrice(value)
    setMinThumbPosition((value / 14000) * 100)
  }

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setMaxPrice(value)
    setMaxThumbPosition((value / 14000) * 100)
  }

  const handleClearAll = () => {
    dispatch(resetFilters())
    setMinPrice(0)
    setMaxPrice(14000)
    setMinThumbPosition(0)
    setMaxThumbPosition(100)
  }

  if (!isOpen) return null
  const generatePriceBars = () => {
    const totalBars = 48 
    const bars = []

    for (let i = 0; i < totalBars; i++) {
      const position = i / totalBars
      const distanceFromCenter = Math.abs(position - 0.5)
      const bellValue = Math.exp(-distanceFromCenter * distanceFromCenter * 10)
      const height = bellValue * 60 + 5 
      const barPosition = (i / totalBars) * 100
      const isInRange = barPosition >= minThumbPosition && barPosition <= maxThumbPosition

      bars.push(
        <div
          key={i}
          className={`${style.sliderBar} ${isInRange ? style.active : ""}`}
          style={{ height: `${height}px` }}
        />,
      )
    }

    return bars
  }

  return (
    <div className={style.overlay} onClick={() => dispatch(closeFilterMenu())}>
      <div className={style.filterCard} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
        <button className={style.closeButton} onClick={() => dispatch(closeFilterMenu())}>
           <svg
            viewBox="0 0 32 32" aria-hidden="true" role="presentation"focusable="false"
            style={{display: "block",fill: "none",height: "16px",width: "16px",stroke: "currentcolor",strokeWidth: 3, }}
  >
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
              <button
                className={`${style.typeButton} ${filters.placeType === "any" ? style.active : ""}`}
                onClick={() => handlePlaceTypeChange("any")}
              >
                Будь-який тип
              </button>
              <button
                className={`${style.typeButton} ${filters.placeType === "room" ? style.active : ""}`}
                onClick={() => handlePlaceTypeChange("room")}
              >
                Кімната
              </button>
              <button
                className={`${style.typeButton} ${filters.placeType === "entire" ? style.active : ""}`}
                onClick={() => handlePlaceTypeChange("entire")}
              >
                Помешкання цілком
              </button>
            </div>
          </section>

          <section className={style.section}>
            <h3 className={style.sectionTitle}>Діапазон цін</h3>
            <p className={style.priceSubtitle}>Ціни за ніч до сплати зборів і податків</p>

            <div className={style.priceSlider}>
              <div className={style.sliderGraph}>{generatePriceBars()}</div>

              <div className={style.sliderContainer}>
                <input
                  type="range"min="0"max="14000" value={minPrice} onChange={handleMinSliderChange} 
                  onMouseUp={handlePriceChange} onTouchEnd={handlePriceChange} className={style.rangeInputMin}    
                />
                <input
                  type="range"
                  min="0"
                  max="14000"
                  value={maxPrice}
                  onChange={handleMaxSliderChange}
                  onMouseUp={handlePriceChange}
                  onTouchEnd={handlePriceChange}
                  className={style.rangeInputMax}
                />
                <div
                  className={style.sliderTrack}
                  style={{
                    left: `${minThumbPosition}%`,
                    width: `${maxThumbPosition - minThumbPosition}%`,
                  }}
                ></div>
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
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      const numValue = Number(value)
                      setMinPrice(numValue)
                      setMinThumbPosition((numValue / 14000) * 100)
                    }}
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
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").replace(/\+/g, "")
                      const numValue = Number(value)
                      setMaxPrice(numValue)
                      setMaxThumbPosition((numValue / 14000) * 100)
                    }}
                    onBlur={handlePriceChange}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className={style.section}>
            <h3 className={style.sectionTitle}>Кімнати та спальні місця</h3>

            <div className={style.roomCounter}>
              <div className={style.roomType}>Спальні</div>
              <div className={style.counterControls}>
                <button className={style.counterButton} onClick={() => dispatch(decrementRoom("bedrooms" as RoomType))}>
                  <span className={style.buttonSymbol}>−</span>
                </button>
                <span className={style.counterValue}>
                  {filters.rooms.bedrooms === 0 ? "Будь-який" : filters.rooms.bedrooms}
                </span>
                <button className={style.counterButton} onClick={() => dispatch(incrementRoom("bedrooms" as RoomType))}>
                  <span className={style.buttonSymbol}>+</span>
                </button>
              </div>
            </div>

            <div className={style.roomCounter}>
              <div className={style.roomType}>Ліжка</div>
              <div className={style.counterControls}>
                <button className={style.counterButton} onClick={() => dispatch(decrementRoom("beds" as RoomType))}>
                  <span className={style.buttonSymbol}>−</span>
                </button>
                <span className={style.counterValue}>
                  {filters.rooms.beds === 0 ? "Будь-який" : filters.rooms.beds}
                </span>
                <button className={style.counterButton} onClick={() => dispatch(incrementRoom("beds" as RoomType))}>
                  <span className={style.buttonSymbol}>+</span>
                </button>
              </div>
            </div>

            <div className={style.roomCounter}>
              <div className={style.roomType}>Ванні кімнати</div>
              <div className={style.counterControls}>
                <button
                  className={style.counterButton}
                  onClick={() => dispatch(decrementRoom("bathrooms" as RoomType))}
                >
                  <span className={style.buttonSymbol}>−</span>
                </button>
                <span className={style.counterValue}>
                  {filters.rooms.bathrooms === 0 ? "Будь-який" : filters.rooms.bathrooms}
                </span>
                <button
                  className={style.counterButton}
                  onClick={() => dispatch(incrementRoom("bathrooms" as RoomType))}
                >
                  <span className={style.buttonSymbol}>+</span>
                </button>
              </div>
            </div>
          </section>

          <section className={style.section}>
            <h3 className={style.sectionTitle}>Зручності</h3>
          </section>
        </div>

        <div className={style.footer}>
          <button className={style.clearButton} onClick={handleClearAll}>
            Очистити все
          </button>
          <button className={style.showResultsButton}>Показати 1000+ осель</button>
        </div>
      </div>
    </div>
  )
}