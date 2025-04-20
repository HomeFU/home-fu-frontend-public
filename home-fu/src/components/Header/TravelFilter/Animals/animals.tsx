"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import styles from "./animals.module.scss";
import animalImage from "..//..//..//..//assets/images/animal.jpg";
import { closeGuest } from "..//..//..//..//redux/TravelFilter/GuestSlices/guestSlice";

interface AnimalsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnimalsModal = ({ isOpen, onClose }: AnimalsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    dispatch(closeGuest());
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div ref={modalRef} className={styles.filterCard}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={handleClose}>
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
        </div>

        <div className={styles.imageWrapper}>
          <img
            src={animalImage}
            alt="Изображение с животным"
            className={styles.serviceAnimalImage}
          />
        </div>

        <div className={styles.contentText}>
          <h2 className={styles.title}>Тварини-помічники</h2>
          <p className={styles.description}>
            Тварини-помічники не вважаються вихованцями, тому додавати
            інформацію про них сюди не потрібно.
          </p>
          <p className={styles.description}>
            У разі потреби уточніть вимоги щодо супроводу служби підтримки.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};
