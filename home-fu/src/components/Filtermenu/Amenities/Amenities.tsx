"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import styles from "./Amenities.module.scss"
import type { RootState } from "../../../redux/store"

const css = styles as Record<string, string>
type Amenity = {
  id: string
  name: string
  icon: string
}
type AmenityCategory = {
  id: string
  title: string
  amenities: Amenity[]
}

const Amenities: React.FC = () => {
  const [expanded, setExpanded] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [animating, setAnimating] = useState(false)
  const { resetTriggered } = useSelector((state: RootState) => state.filterMenu)
  const amenityCategories: AmenityCategory[] = [
    {
      id: "basic",
      title: "Базові зручності",
      amenities: [
        { id: "wifi", name: "Wi-Fi", icon: "/src/assets/icons/iconWifi.svg" },
        { id: "kitchen", name: "Кухня", icon: "/src/assets/icons/iconKitchen.svg" },
        { id: "washer", name: "Пральна машина", icon: "/src/assets/icons/iconWasher.svg" },
        { id: "dryer", name: "Сушильна машина", icon: "/src/assets/icons/iconDryer.svg" },
        { id: "ac", name: "Кондиціонер", icon: "/src/assets/icons/iconAC.svg" },
        { id: "heating", name: "Опалення", icon: "/src/assets/icons/iconHeating.svg" },
        { id: "workspace", name: "Окреме робоче місце", icon: "/src/assets/icons/iconWorkspace.svg" },
        { id: "tv", name: "Телевізор", icon: "/src/assets/icons/iconTV.svg" },
        { id: "hairdryer", name: "Фен", icon: "/src/assets/icons/iconHairdryer.svg" },
        { id: "iron", name: "Праска", icon: "/src/assets/icons/iconIron.svg" },
      ],
    },
    {
      id: "special",
      title: "Особливі зручності",
      amenities: [
        { id: "pool", name: "Басейн", icon: "/src/assets/icons/iconPool.svg" },
        { id: "hottub", name: "Гідромасажна ванна", icon: "/src/assets/icons/iconHottub.svg" },
        { id: "parking", name: "Безкоштовний паркінг", icon: "/src/assets/icons/iconParking.svg" },
        { id: "evcharger", name: "Зарядна станція для електромобіля", icon: "/src/assets/icons/iconEVCharger.svg" },
        { id: "crib", name: "Дитяче ліжечко", icon: "/src/assets/icons/iconCrib.svg" },
        { id: "kingbed", name: "Дуже широке двоспальне ліжко", icon: "/src/assets/icons/iconKingBed.svg" },
        { id: "gym", name: "Тренажерний зал", icon: "/src/assets/icons/iconGym.svg" },
        { id: "grill", name: "Гриль", icon: "/src/assets/icons/iconGrill.svg" },
        { id: "breakfast", name: "Сніданок", icon: "/src/assets/icons/iconBreakfast.svg" },
        { id: "fireplace", name: "Камін у приміщенні", icon: "/src/assets/icons/iconFireplace.svg" },
        { id: "smoking", name: "Дозволено курити", icon: "/src/assets/icons/iconSmoking.svg" },
      ],
    },
    {
      id: "location",
      title: "Розташування",
      amenities: [
        { id: "beachaccess", name: "Вихід до пляжу", icon: "/src/assets/icons/iconBeach.svg" },
        { id: "waterfront", name: "Набережна", icon: "/src/assets/icons/iconWaterfront.svg" },
      ],
    },
    {
      id: "safety",
      title: "Безпека",
      amenities: [
        { id: "smokedetector", name: "Детектор диму", icon: "/src/assets/icons/iconSmokeDetector.svg" },
        { id: "codetector", name: "Детектор чадного газу", icon: "/src/assets/icons/iconCODetector.svg" },
      ],
    },
  ]
  const arrowIcon = "/src/assets/icons/iconArrow.svg"
  useEffect(() => {
    if (resetTriggered) {
      setSelectedAmenities([])
    }
  }, [resetTriggered])
  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => setAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [animating])
  const toggleExpanded = () => {
    setAnimating(true)
    setExpanded(!expanded)
  }
  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }
  const renderAmenityButton = (amenity: Amenity) => (
    <button
      key={amenity.id}
      className={`${css.amenityButton} ${selectedAmenities.includes(amenity.id) ? css.selected : ""}`}
      onClick={() => toggleAmenity(amenity.id)}
    >
      <span className={css.amenityIcon}>
      <img src={amenity.icon} alt={amenity.name} width={18} height={18} />
      </span>
      <span className={css.amenityName}>{amenity.name}</span>
    </button>
  )

  return (
    <>
      <h3 className={css.sectionTitle}>Зручності</h3>

      <div className={css.amenitiesWrapper}>
        <h4 className={css.categoryTitle}>{amenityCategories[0].title}</h4>
        <div className={css.amenitiesContainer}>{amenityCategories[0].amenities.map(renderAmenityButton)}</div>
        <div className={`${css.expandableContent} ${expanded ? css.expanded : ""} ${animating ? css.animating : ""}`}>
          {amenityCategories.slice(1).map((category) => (
            <div key={category.id} className={css.amenityCategory}>
              <h4 className={css.categoryTitle}>{category.title}</h4>
              <div className={css.amenitiesContainer}>{category.amenities.map(renderAmenityButton)}</div>
            </div>
          ))}
        </div>
      </div>

      <button className={css.showMoreButton} onClick={toggleExpanded}>
        {expanded ? "Показати менше" : "Показати більше"}
        <span className={`${css.arrowIcon} ${expanded ? css.arrowUp : ""}`}>
        <img src={arrowIcon} alt="arrow" width={16} height={16} />
        </span>
      </button>
    </>
  )
}

export default Amenities