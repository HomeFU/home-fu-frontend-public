import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
} from "date-fns";
import { uk } from "date-fns/locale";
import { useDispatch, useSelector } from 'react-redux';
import style from "./datePicker.module.scss";
import { useState } from "react";
import { setSelectedDepartureDate, toggleDateDeparture } from "../../../../redux/DateDepartureSlice/departureSlice";
import { closeDateArrival } from "../../../../redux/DateArrivalSlice/arrivalSlice";
import { closeRegion } from "../../../../redux/TravelFilter/GuestSlices/regionSlice";
import { closeGuest } from "../../../../redux/TravelFilter/GuestSlices/guestSlice";

export function DateDeparture() {
  const dispatch = useDispatch()
  const selectedDate = useSelector((state) => state.departure.selectedDate);
  const isOpen = useSelector((state) => state.departure.isOpen);

  const onCloseDateArrive = () => {
    dispatch((closeDateArrival()));
    dispatch(closeRegion());
    dispatch(closeGuest());
    dispatch(toggleDateDeparture());
  }

  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handleDateClick = (date: Date) => {
    dispatch(setSelectedDepartureDate(date))
  }

  const renderCalendar = (month: Date) => {
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

    const days = eachDayOfInterval({ start: startDate, end: endDate })

    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]

    return (
      <div className={style.calendar}>
        <div className={style.calendar_month_name}>
          {format(month, "LLLL yyyy", { locale: uk })}
        </div>
        <div className={style.calendar_grid}>
          {weekDays.map((day) => (
            <div key={day} className={style.calendar_weekday}>
              {day}
            </div>
          ))}

          {days.map((day, i) => {
            const isCurrentMonth = isSameMonth(day, month)
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
            const isPast = isBefore(day, new Date()) && !isToday(day)

            let dayClasses = style.calendar_day
            if (!isCurrentMonth) dayClasses += ` ${style.calendar_day_other_month}`
            if (isSelected) dayClasses += ` ${style.calendar_day_selected}`
            if (isToday(day) && !isSelected) dayClasses += ` ${style.calendar_day_today}`
            if (isPast) dayClasses += ` ${style.calendar_day_past}`

            return (
              <button key={i} onClick={() => handleDateClick(day)} disabled={isPast} className={dayClasses}>
                {format(day, "d")}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const formatSelectedDate = () => {
    if (!selectedDate) return "Додайте дати"
    return format(selectedDate, "d MMM yyyy", { locale: uk })
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const nextMonth = addMonths(currentMonth, 1)

  return (
    <div className={style.date_picker}>
      <div
        onClick={() => {onCloseDateArrive()}}
        className={`${style.date_picker_trigger} ${isOpen ? style.date_picker_trigger_active : ""}`}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className={style.date_picker_label}>Виїзд</div>
        <div className={`${style.date_picker_value} ${selectedDate ? style.date_picker_value_selected : ""}`}>
          {formatSelectedDate()}
        </div>
      </div>

      {isOpen && (
        <div
          className={style.date_picker_dropdown}
          role="dialog"
          aria-modal="true"
          aria-label="Виберіть дату прибуття"
        >
          <div className={style.date_picker_header}>
            <button onClick={goToPreviousMonth} className={style.date_picker_nav_button}>
              <svg
                className={style.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button onClick={goToNextMonth} className={style.date_picker_nav_button}>
              <svg
                className={style.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className={style.date_picker_calendars}>
            <div className={style.date_picker_left_calendar}>
              {renderCalendar(currentMonth)}
            </div>
            <div className={style.date_picker_right_calendar}>
              {renderCalendar(nextMonth)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
