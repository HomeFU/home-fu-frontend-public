import { useDispatch, useSelector } from "react-redux";
import styles from "./animals.module.scss";
import animalImage from "..//..//..//..//assets/images/animal.jpg";
import { closeAnimalsModal } from "..//..//..//..//redux/TravelFilter/GuestSlices/animalsSlice";
import { RootState } from "..//..//..//..//redux/store"; 
import { closeGuest } from "../../../../redux/TravelFilter/GuestSlices/guestSlice";

export const AnimalsModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.animalsModal.isOpen);

  const onCloseAnimalModal = () => {
    dispatch(closeAnimalsModal());
    dispatch(closeGuest())
  }

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      onClick={onCloseAnimalModal}
    >
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <button
            className={styles.closeButton}
            onClick={onCloseAnimalModal}
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
            alt="Изображение с животным" loading="lazy"
            className={styles.serviceAnimalImage}
          />
        </div>

        <div className={styles.contentText}>
          <h2 className={styles.title}>Тварини-помічники</h2>
          <p className={styles.description}>
            Тварини-помічники не є домашніми тваринами, тому додавати їх тут не потрібно.
          </p>
          <p className={styles.description}>
            Подорожуєте з твариною для емоційної підтримки? Ознайомтеся з нашими <u>правилами щодо доступності для людей з особливими потребами.</u>
          </p>
        </div>
      </div>
    </div>
  );
};
