import { useState, useEffect } from "react";
import style from "./bookHome.module.scss";
import { ReservationService } from "..//..//api//ServiceReservation/reservationService";
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
  isAfter,
  parseISO,
} from "date-fns";
import { uk } from "date-fns/locale";

type BookHomeModalProps = {
  price: number;
  onClose: () => void;
  maxGuests: number;
  cardId: number;
};

type BookedPeriod = {
  checkIn: string;
  checkOut: string;
};

export const BookHomeModal = ({ price, onClose, maxGuests, cardId }: BookHomeModalProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [hasPet, setHasPet] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedPeriods, setBookedPeriods] = useState<BookedPeriod[]>([]);

  useEffect(() => {
    const today = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(today.getMonth() + 6);
    
    const loadAvailability = async () => {
      try {
        const fromDate = format(today, 'yyyy-MM-dd');
        const toDate = format(sixMonthsLater, 'yyyy-MM-dd');
        
        const periods = await ReservationService.checkAvailability(
          cardId, 
          fromDate, 
          toDate
        );
        setBookedPeriods(periods);
      } catch (error) {
        console.error("Помилка при загрузці доступних дат:", error);
      }
    };
    
    loadAvailability();
  }, [cardId]);

  const isDateBooked = (day: Date) => {
    return bookedPeriods.some(period => {
      const checkIn = parseISO(period.checkIn);
      const checkOut = parseISO(period.checkOut);
      return day >= checkIn && day <= checkOut;
    });
  };

  const handleAdultsChange = (increment: boolean) => {
    if (increment) {
      if (adults + children + infants < maxGuests) {
        setAdults(prev => prev + 1);
      }
    } else {
      setAdults(prev => Math.max(1, prev - 1));
    }
  };

  const handleChildrenChange = (increment: boolean) => {
    if (increment) {
      if (adults + children + infants < maxGuests) {
        setChildren(prev => prev + 1);
      }
    } else {
      setChildren(prev => Math.max(0, prev - 1));
    }
  };

  const handleInfantsChange = (increment: boolean) => {
    if (increment) {
      if (adults + children + infants < maxGuests) {
        setInfants(prev => prev + 1);
      }
    } else {
      setInfants(prev => Math.max(0, prev - 1));
    }
  };

  const handleDateClick = (day: Date) => {
    if (isDateBooked(day)) {
      setError("Ці дати вже заброньовані");
      return;
    }

    if ((startDate && endDate) || (startDate && isBefore(day, startDate))) {
      setStartDate(day);
      setEndDate(null);
      setTotalPrice(0);
      return;
    }

    if (!startDate || isSameDay(day, startDate)) {
      setStartDate(day);
      setEndDate(null);
      setTotalPrice(0);
      return;
    }

    const daysInRange = eachDayOfInterval({
      start: startDate,
      end: day
    });

    const hasBookedDates = daysInRange.some(d => isDateBooked(d));
    
    if (hasBookedDates) {
      setError("У вибраному діапазоні є заброньовані дати");
      return;
    }

    setEndDate(day);
    if (startDate) {
      const daysCount = Math.ceil(
        Math.abs(day.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      setTotalPrice(daysCount * price);
    }
  };

  const renderCalendar = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const startDateCalendar = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDateCalendar = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start: startDateCalendar, end: endDateCalendar });
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
            const isStart = startDate ? isSameDay(day, startDate) : false;
            const isEnd = endDate ? isSameDay(day, endDate) : false;
            const isSelected = startDate && endDate 
              ? (isAfter(day, startDate) && isBefore(day, endDate)) 
              : false;
            const isPast = isBefore(day, new Date()) && !isToday(day);
            const isBooked = isDateBooked(day);

            let dayClasses = style.calendar_day;
            if (!isCurrentMonth) dayClasses += ` ${style.calendar_day_other_month}`;
            if (isStart) dayClasses += ` ${style.calendar_day_start}`;
            if (isEnd) dayClasses += ` ${style.calendar_day_end}`;
            if (isSelected) dayClasses += ` ${style.calendar_day_selected}`;
            if (isToday(day)) dayClasses += ` ${style.calendar_day_today}`;
            if (isPast) dayClasses += ` ${style.calendar_day_past}`;
            if (isBooked) dayClasses += ` ${style.calendar_day_booked}`;

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleDateClick(day)}
                disabled={isPast || isBooked}
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Будь ласка, оберіть період бронювання");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token') || '';
      const bookingData = {
        checkInDate: format(startDate, 'yyyy-MM-dd'),
        checkOutDate: format(endDate, 'yyyy-MM-dd'),
        adults,
        children,
        infants,
        pets: hasPet ? 1 : 0,
        cardId
      };

      await ReservationService.createReservation(bookingData, token);
      setIsSuccess(true);
      setTimeout(onClose, 3000);
    } catch (err: any) {
      console.error("Помилка бронювання:", err);
      setError(err.message || "Помилка при бронюванні. Спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className={style.closeButton} 
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h2 className={style.modalTitle}>Бронювання помешкання</h2>
        
        {error && <div className={style.error}>{error}</div>}
        {isSuccess && <div className={style.successMessage}>Успішно заброньовано!</div>}

        <form onSubmit={handleSubmit} className={style.bookingForm}>
          <div className={style.calendarSection}>
            <h3>Оберіть період:</h3>
            <div className={style.calendarNavigation}>
              <button 
                type="button" 
                onClick={goToPreviousMonth} 
                className={style.navButton}
                aria-label="Попередній місяць"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <span className={style.currentMonth}>
                {format(currentMonth, "MMMM yyyy", { locale: uk })}
              </span>
              <button 
                type="button" 
                onClick={goToNextMonth} 
                className={style.navButton}
                aria-label="Наступний місяць"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            
            <div className={style.calendars}>
              {renderCalendar(currentMonth)}
              {renderCalendar(nextMonth)}
            </div>
          </div>

          <div className={style.detailsSection}>
            <div className={style.maxGuestsMessage}>
              Максимальна кількість гостей: {maxGuests}
            </div>

            <div className={style.guestsControls}>
              <div className={style.guestControl}>
                <label>Дорослі:</label>
                <div className={style.counterControl}>
                  <button 
                    type="button" 
                    onClick={() => handleAdultsChange(false)}
                    disabled={adults <= 1}
                    className={style.counterButton}
                  >
                    -
                  </button>
                  <span className={style.counterValue}>{adults}</span>
                  <button 
                    type="button" 
                    onClick={() => handleAdultsChange(true)}
                    disabled={adults + children + infants >= maxGuests}
                    className={style.counterButton}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={style.guestControl}>
                <label>Діти (2-12 років):</label>
                <div className={style.counterControl}>
                  <button 
                    type="button" 
                    onClick={() => handleChildrenChange(false)}
                    disabled={children <= 0}
                    className={style.counterButton}
                  >
                    -
                  </button>
                  <span className={style.counterValue}>{children}</span>
                  <button 
                    type="button" 
                    onClick={() => handleChildrenChange(true)}
                    disabled={adults + children + infants >= maxGuests}
                    className={style.counterButton}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={style.guestControl}>
                <label>Немовлята (до 2 років):</label>
                <div className={style.counterControl}>
                  <button 
                    type="button" 
                    onClick={() => handleInfantsChange(false)}
                    disabled={infants <= 0}
                    className={style.counterButton}
                  >
                    -
                  </button>
                  <span className={style.counterValue}>{infants}</span>
                  <button 
                    type="button" 
                    onClick={() => handleInfantsChange(true)}
                    disabled={adults + children + infants >= maxGuests}
                    className={style.counterButton}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={style.petControl}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={hasPet}
                    onChange={(e) => setHasPet(e.target.checked)}
                  />
                  <span>Я буду з твариною</span>
                </label>
              </div>
            </div>

            <div className={style.priceSummary}>
              <div className={style.priceRow}>
                <span>Ціна за добу:</span>
                <span>{price} $</span>
              </div>
              
              {startDate && (
                <div className={style.priceRow}>
                  <span>Заїзд:</span>
                  <span>{format(startDate, 'dd.MM.yyyy')}</span>
                </div>
              )}
              
              {endDate && (
                <div className={style.priceRow}>
                  <span>Виїзд:</span>
                  <span>{format(endDate, 'dd.MM.yyyy')}</span>
                </div>
              )}
              
              {totalPrice > 0 && (
                <>
                  <div className={style.priceRow}>
                    <span>Кількість днів:</span>
                    <span>{Math.ceil(Math.abs(endDate!.getTime() - startDate!.getTime()) / (1000 * 60 * 60 * 24))}</span>
                  </div>
                  <div className={`${style.priceRow} ${style.totalPrice}`}>
                    <span>До сплати:</span>
                    <span>{totalPrice} $</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {!isSuccess && (
            <button 
              type="submit" 
              className={style.submitButton}
              disabled={!startDate || !endDate || isLoading}
            >
              {isLoading ? 'Відправка...' : 'Підтвердити бронювання'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};