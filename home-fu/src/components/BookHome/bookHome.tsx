import { useState } from "react";
import style from "./bookHome.module.scss";
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

type BookHomeModalProps = {
  price: number;
  onClose: () => void;
};

export const BookHomeModal = ({ price, onClose }: BookHomeModalProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  const renderCalendar = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

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
            const isCurrentMonth = isSameMonth(day, month);
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
            const isPast = isBefore(day, new Date()) && !isToday(day);

            let dayClasses = style.calendar_day;
            if (!isCurrentMonth) dayClasses += ` ${style.calendar_day_other_month}`;
            if (isSelected) dayClasses += ` ${style.calendar_day_selected}`;
            if (isToday(day) && !isSelected) dayClasses += ` ${style.calendar_day_today}`;
            if (isPast) dayClasses += ` ${style.calendar_day_past}`;

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(day)}
                disabled={isPast}
                className={dayClasses}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const nextMonth = addMonths(currentMonth, 1);

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setGuests(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки данных бронирования
    alert(`Бронювання на ${selectedDate ? format(selectedDate, 'dd.MM.yyyy') : 'не вибрану дату'} для ${guests} гостей`);
    onClose();
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>×</button>
        <h2 className={style.modalTitle}>Бронювання помешкання</h2>
        
        <form onSubmit={handleSubmit} className={style.bookingForm}>
          <div className={style.calendarSection}>
            <h3>Оберіть дату:</h3>
            <div className={style.calendarHeader}>
              <button type="button" onClick={goToPreviousMonth} className={style.navButton}>
                ‹
              </button>
              <button type="button" onClick={goToNextMonth} className={style.navButton}>
                ›
              </button>
            </div>
            <div className={style.calendars}>
              {renderCalendar(currentMonth)}
              {renderCalendar(nextMonth)}
            </div>
          </div>

          <div className={style.guestsSection}>
            <label htmlFor="guests">Кількість гостей:</label>
            <input
              type="number"
              id="guests"
              min="1"
              max="10"
              value={guests}
              onChange={handleGuestsChange}
              className={style.guestsInput}
            />
          </div>

          <div className={style.priceSection}>
            <p>Ціна за добу: <strong>{price}$</strong></p>
            {selectedDate && (
              <p>Обрана дата: {format(selectedDate, 'dd.MM.yyyy')}</p>
            )}
          </div>

          <button type="submit" className={style.submitButton}>
            Підтвердити бронювання
          </button>
        </form>
      </div>
    </div>
  );
};