"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import style from "./facilities.module.scss"
import type { RootState } from "../../../redux/store"

type AccessibilityOption = {
  id: string
  name: string
}

type AccessibilityCategory = {
  id: string
  title: string
  options: AccessibilityOption[]
}

const Facilities: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const contentRef = useRef<HTMLDivElement>(null)
  const { resetTriggered } = useSelector((state: RootState) => state.filterMenu)

  useEffect(() => {
    if (resetTriggered) {
      setSelectedOptions([])
    }
  }, [resetTriggered])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const accessibilityCategories: AccessibilityCategory[] = [
    {
      id: "entrance",
      title: "Вхід для гостей і місце для паркування",
      options: [
        { id: "step-free-entrance", name: "Безбар'єрний вхід" },
        { id: "accessible-parking", name: "Паркувальне місце для людей з інвалідністю" },
        { id: "wide-entrance", name: "Гостьовий вхід шириною понад 81 см" },
      ],
    },
    {
      id: "bedroom",
      title: "Спальня",
      options: [
        { id: "step-free-bedroom", name: "Вхід до спальні без сходинок" },
        { id: "wide-bedroom-entrance", name: "Вхід до спальні шириною понад 81 см" },
      ],
    },
    {
      id: "bathroom",
      title: "Ванна кімната",
      options: [
        { id: "step-free-bathroom", name: "Вхід до ванної кімнати без сходинок" },
        { id: "wide-bathroom-entrance", name: "Вхід шириною понад 81 см" },
        { id: "toilet-grab-bars", name: "Поручень біля унітаза" },
        { id: "shower-grab-bars", name: "Поручень у душовій" },
        { id: "step-free-shower", name: "Душ без сходинок" },
        { id: "shower-chair", name: "Стілець для душу або ванни" },
      ],
    },
    {
      id: "adaptive",
      title: "Адаптивне обладнання",
      options: [{ id: "mobile-lift", name: "Стельовий або мобільний підйомник" }],
    },
  ]

  return (
    <div className={style.facilitiesContainer}>
      <div className={style.header} onClick={toggleExpanded}>
        <h4 className={style.title}>Зручності для людей з особливими потребами</h4>
        <button className={style.toggleButton}>
          <svg className={isExpanded ? style.chevronUp : style.chevron}>
            <path d="M12.5 6L8 10.5L3.5 6" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className={style.optionsContainer} ref={contentRef}>
          {accessibilityCategories.map((category) => (
            <div key={category.id} className={style.category}>
              <div className={style.categoryTitle}>{category.title}</div>
              {category.options.map((option) => (
                <label key={option.id} className={style.checkboxItem}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => toggleOption(option.id)}
                    className={style.checkbox}
                  />
                  <span className={style.optionName}>{option.name}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Facilities