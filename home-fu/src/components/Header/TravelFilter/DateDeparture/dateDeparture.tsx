"use client"

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
  addDays,
  isToday,
  isBefore,
} from "date-fns";
import { uk } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import style from "./datePicker.module.scss"

type DatePickerTab = "dates" | "months" | "flexible"

export function DateDeparture() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [activeTab, setActiveTab] = useState<DatePickerTab>("dates")
    const [isOpen, setIsOpen] = useState(false)
  
    const datePickerRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLDivElement>(null)
  
    const nextMonth = addMonths(currentMonth, 1)
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          datePickerRef.current &&
          !datePickerRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }
  
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false)
        }
      }
  
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleKeyDown)
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [isOpen])
  
    const handleDateClick = (date: Date) => {
      setSelectedDate(date)
    }
  
    const handleApply = () => {
      setIsOpen(false)
    }
  
    const handleClear = () => {
      setSelectedDate(null)
    }
  
    const toggleDatePicker = () => {
      setIsOpen(!isOpen)
    }
  
    const goToPreviousMonth = () => {
      setCurrentMonth((prevMonth) => subMonths(prevMonth, 1))
    }
  
    const goToNextMonth = () => {
      setCurrentMonth((prevMonth) => addMonths(prevMonth, 1))
    }
  
    const renderCalendar = (month: Date) => {
      const monthStart = startOfMonth(month)
      const monthEnd = endOfMonth(month)
      const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
      const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })
  
      const days = eachDayOfInterval({ start: startDate, end: endDate })
  
      const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
  
      return (
        <div className={style.calendar}>
          <div className={style.calendar_month_name}>{format(month, "LLLL yyyy", { locale: uk })}</div>
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
  
    return (
      <div className={style.date_picker}>
        {/* Date input trigger */}
        <div
          ref={triggerRef}
          onClick={toggleDatePicker}
          className={`${style.date_picker_trigger} ${isOpen ? style.date_picker_trigger_active : ""}`}
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <div className={style.date_picker_label}>Прибуття</div>
          <div className={`${style.date_picker_value} ${selectedDate ? style.date_picker_value_selected : ""}`}>
            {formatSelectedDate()}
          </div>
        </div>
  
        {/* Date picker dropdown */}
        {isOpen && (
          <div
            ref={datePickerRef}
            className={style.date_picker_dropdown}
            role="dialog"
            aria-modal="true"
            aria-label="Виберіть дату прибуття"
          >
            <div className={style.date_picker_header}>
              <button
                onClick={goToPreviousMonth}
                className={style.date_picker_nav_button}
                aria-label="Попередній місяць"
              >
                <ChevronLeftIcon />
              </button>
  
              <div className={style.date_picker_tabs}>
                <button
                  onClick={() => setActiveTab("dates")}
                  className={`${style.date_picker_tab} ${activeTab === "dates" ? style.date_picker_tab_active : ""}`}
                >
                  Дати
                </button>
                <button
                  onClick={() => setActiveTab("months")}
                  className={`${style.date_picker_tab} ${activeTab === "months" ? style.date_picker_tab_active : ""}`}
                >
                  Місяці
                </button>
                <button
                  onClick={() => setActiveTab("flexible")}
                  className={`${style.date_picker_tab} ${activeTab === "flexible" ? style.date_picker_tab_active : ""}`}
                >
                  Гнучкі правила
                </button>
              </div>
  
              <button onClick={goToNextMonth} className={style.date_picker_nav_button} aria-label="Наступний місяць">
                <ChevronRightIcon />
              </button>
            </div>
  
            <div className={style.date_picker_calendars}>
              {renderCalendar(currentMonth)}
              {renderCalendar(nextMonth)}
            </div>
  
            <div className={style.date_picker_quick_select}>
              <button className={style.date_picker_quick_button} onClick={() => setSelectedDate(new Date())}>
                Точні дати
              </button>
              <button className={style.date_picker_quick_button} onClick={() => setSelectedDate(addDays(new Date(), 1))}>
                +/- 1 день
              </button>
              <button className={style.date_picker_quick_button} onClick={() => setSelectedDate(addDays(new Date(), 2))}>
                +/- 2 дні
              </button>
              <button className={style.date_picker_quick_button} onClick={() => setSelectedDate(addDays(new Date(), 3))}>
                +/- 3 дні
              </button>
              <button className={style.date_picker_quick_button} onClick={() => setSelectedDate(addDays(new Date(), 7))}>
                +/- 7 днів
              </button>
            </div>
  
            <div className={style.date_picker_footer}>
              <button className={style.date_picker_clear_button} onClick={handleClear}>
                Очистити
              </button>
  
              <button className={style.date_picker_apply_button} onClick={handleApply}>
                Застосувати
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  function ChevronLeftIcon() {
    return (
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
    )
  }
  
  function ChevronRightIcon() {
    return (
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
    )
  }
  
  