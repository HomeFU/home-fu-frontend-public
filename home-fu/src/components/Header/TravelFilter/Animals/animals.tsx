"use client"

import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import styles from "./animals.module.scss"
import animalImage from "../../../../assets/images/animal.jpg"
import { useDispatch } from "react-redux"
import { closeGuest } from "..//..//..//..//redux/TravelFilter/GuestSlices/guestSlice"

type AnimalsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const AnimalsModal: React.FC<AnimalsModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()

  const handleClose = () => {
    onClose()
    dispatch(closeGuest()) 
  }

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    document.body.style.paddingRight = isOpen ? `${scrollbarWidth}px` : "0"

    return () => {
      document.body.style.overflow = "auto"
      document.body.style.paddingRight = "0"
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
        <button className={styles.closeButton} onClick={handleClose}>
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              style={{
                display: "block",
                fill: "none",
                height: "20px",
                width: "20px",
                stroke: "currentcolor",
                strokeWidth: 3,
              }}
            >
              <path d="m6 6 20 20" />
              <path d="m26 6-20 20" />
            </svg>
          </button>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={animalImage || "/placeholder.svg"}
            alt="Изображение с животным"
            className={styles.serviceAnimalImage}
          />
        </div>

        <div className={styles.contentText}>
          <h2 className={styles.title}>Тварини-помічники</h2>
          <p className={styles.description}>
            Тварини-помічники не вважаються вихованцями, тому додавати інформацію про них сюди не потрібно.
          </p>
          <p className={styles.description}>
            Подорожуєте з твариною для емоційної підтримки? Ознайомтеся з нашими <u>правилами щодо доступності для людей з особливими потребами.</u>
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}
