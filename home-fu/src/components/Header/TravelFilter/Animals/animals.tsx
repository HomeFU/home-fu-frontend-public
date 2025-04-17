"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import styles from "./animals.module.scss"

interface AnimalsModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AnimalsModal = ({ isOpen, onClose }: AnimalsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
      document.body.style.overflow = "hidden" 
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "" 
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div ref={modalRef} className={styles.filterCard}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.imageContainer}>
              <img src="src/assets/images/animal.jpg" alt="Тварини-помічники" className={styles.serviceAnimalImage} />
            </div>

            <p className={styles.description}>
              Тварини-помічники не є домашніми тваринами, тому додавати їх тут не потрібно.
            </p>

            <p className={styles.description}>
              Подорожуєте з твариною для емоційної підтримки? Ознайомтеся з нашими{" "}
              <a href="#" className={styles.link}>
                правилами щодо доступності для людей з особливими потребами
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
