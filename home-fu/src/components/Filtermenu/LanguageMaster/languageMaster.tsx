"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import style from "./languageMaster.module.scss"
import type { RootState } from "../../../redux/store"

type Language = {
  id: string
  name: string
}

export const LanguageMaster = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const contentRef = useRef<HTMLDivElement>(null)
  const { resetTriggered } = useSelector((state: RootState) => state.filterMenu)

  useEffect(() => {
    if (resetTriggered) {
      setSelectedLanguages([])
    }
  }, [resetTriggered])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleLanguage = (id: string) => {
    setSelectedLanguages((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const languageObj: Record<string, string> = {
    chinese: "Китайська",
    english: "Англійська",
    french: "Французька",
    german: "Німецька",
    italian: "Італійська",
    japanese: "Японська",
    korean: "Корейська",
    portuguese: "Португальська",
    russian: "Російська",
    spanish: "Іспанська",
    arabic: "Арабська",
    czech: "Чеська",
    danish: "Данська",
    dutch: "Голландська",
    finnish: "Фінська",
    greek: "Грецька",
    hebrew: "Іврит",
    hindi: "Хінді",
    hungarian: "Угорська",
    icelandic: "Ісландська",
    indonesian: "Індонезійська",
    malay: "Малайська",
    norwegian: "Норвезька",
    polish: "Польська",
    swedish: "Шведська",
    thai: "Тайська",
    turkish: "Турецька",
    afrikaans: "Африкаанс",
    albanian: "Албанська",
    azerbaijani: "Азербайджанська",
    basque: "Баскська",
    belarusian: "Білоруська",
    bengali: "Бенгальська",
    bulgarian: "Болгарська",
    estonian: "Естонська",
    georgian: "Грузинська",
    irish: "Ірландська",
    kyrgyz: "Киргизька",
    latvian: "Латвійська",
    lithuanian: "Литовська",
    macedonian: "Македонська",
    persian: "Перська",
    punjabi: "Пенджабі",
    romanian: "Румунська",
    serbian: "Сербська",
    slovak: "Словацька",
    slovenian: "Словенська",
    tagalog: "Тагальська",
    ukrainian: "Українська",
    urdu: "Урду",
    zulu: "Зулу",
    sign: "Мова жестів",
  }
  const languages: Language[] = Object.entries(languageObj).map(([id, name]) => ({ id, name }))

  const leftColumnLanguages = languages.filter((_, index) => index % 2 === 0)
  const rightColumnLanguages = languages.filter((_, index) => index % 2 === 1)

  return (
    <div className={style.languageMasterContainer}>
      <div className={style.header} onClick={toggleExpanded}>
        <h4 className={style.title}>Мова господаря</h4>
        <button className={style.toggleButton}>
          <svg className={isExpanded ? style.chevronUp : style.chevron}>
            <path d="M12.5 6L8 10.5L3.5 6" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className={style.languageGrid} ref={contentRef}>
          <div className={style.languageColumn}>
            {leftColumnLanguages.map((language) => (
              <label key={language.id} className={style.languageItem}>
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language.id)}
                  onChange={() => toggleLanguage(language.id)}
                  className={style.checkbox}
                />
                <span className={style.languageName}>{language.name}</span>
              </label>
            ))}
          </div>
          <div className={style.languageColumn}>
            {rightColumnLanguages.map((language) => (
              <label key={language.id} className={style.languageItem}>
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language.id)}
                  onChange={() => toggleLanguage(language.id)}
                  className={style.checkbox}
                />
                <span className={style.languageName}>{language.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}