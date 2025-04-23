"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./animals.module.scss";
import animalImage from "..//..//..//..//assets/images/animal.jpg";
import { closeAnimalsModal } from "..//..//..//..//redux/TravelFilter/GuestSlices/animalsSlice";
import { RootState } from "..//..//..//..//redux/store"; 

export const AnimalsModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.animalsModal.isOpen);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      onClick={() => dispatch(closeAnimalsModal())}
    >
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <button
            className={styles.closeButton}
            onClick={() => dispatch(closeAnimalsModal())}
            type="button"
          >
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
            src={animalImage || "/placeholder.svg"}
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
    </div>
  );
};
