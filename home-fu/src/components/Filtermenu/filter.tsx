import { useDispatch, useSelector } from "react-redux"
import style from "./filter.module.scss"
import { closeFilterMenu,resetFilters } from "../../redux/Filtermenu/filtermenu"
import type { RootState } from "../../redux/store"
import { ButtonType} from "./ButtonPosition/ButtonType/ButtonTypes"
import { Room } from "./ButtonPosition/Room/RoomButton"
import {FullRoom}  from "../Filtermenu/ButtonPosition/FullRoom/fullRoomButton"
import {PriceRange}  from "../Filtermenu/PriceRange/RriceRangeScroll"
import {RoomBedroom } from "../Filtermenu//RoomBedroom/RoomBedroomButton"
import {Amenities}  from "../Filtermenu/Amenities/Amenities"
import {Armoring } from "../Filtermenu/Armoring/Armoring"
import {TypeRoom } from "../Filtermenu/TypeRoom/typeRoom"
import {Facilities}  from "../Filtermenu/Facilities/facilities"
import {LanguageMaster}  from "../Filtermenu/LanguageMaster/languageMaster"

export const Filter = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.filterMenu.isOpen);

  const handleClose = () => {
    dispatch(closeFilterMenu());
  };
  return (
    <div
      className={`${style.overlay} ${isOpen ? style.open : ''}`}
      onClick={handleClose}
    >
      <div
        className={style.filterCard}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.header}>
          <button
            className={style.closeButton}
            onClick={handleClose}
            type="button"
          >
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              style={{
                display: "block",
                fill: "none",
                height: "16px",
                width: "16px",
                stroke: "currentcolor",
                strokeWidth: 3,
              }}
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
            <Armoring />
          </section>

          <section className={`${style.section} ${style.noPaddingSection}`}>
            <TypeRoom />
          </section>

          <section className={`${style.section} ${style.noPaddingSection}`}>
            <Facilities />
          </section>

          <section className={`${style.section} ${style.noPaddingSection}`}>
            <LanguageMaster />
          </section>
        </div>
        <div className={style.footer}>
          <button
            className={style.clearButton}
            onClick={() => dispatch(resetFilters())}
          >
            Очистити все
          </button>
          <button className={style.showResultsButton}>Показати 1000+ осель</button>
        </div>
      </div>
    </div>

  )
}
