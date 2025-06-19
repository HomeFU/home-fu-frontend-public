import style from "./addNewCardForCategories.module.scss";
import { useDispatch } from "react-redux";
import { closeAddCardForm } from "../../../../redux/AdminPanel/adminCardAdd";

export const AddNewCardForCategories = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAddCardForm());
  };

  return (
    <div className={style.modalWrapper} onClick={handleClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={style.closeButton}
          onClick={handleClose}
          type="button"
          aria-label="Закрыть"
        >
          &times;
        </button>
        <h1 className={style.title}>Add new card</h1>
        <form className={style.formContent}>
          <input autoComplete="off" className={style.input} type="text" placeholder="Enter name for card" />
          <input autoComplete="off" className={style.input} type="number" placeholder="Enter locationId for card" />
          <input autoComplete="off" className={style.input} type="text" placeholder="Enter location name for card" />
         
          <div className={style.dateInputRow}>
            <span>Enter start date</span>
            <input autoComplete="off" className={style.input} type="date" />
          </div>
          <div className={style.dateInputRow}>
            <span>Enter end date</span>
            <input autoComplete="off" className={style.input} type="date" />
          </div>
         
          <input autoComplete="off" className={style.input} type="number" placeholder="Enter rating for card" />
          <input autoComplete="off" className={style.input} type="number" placeholder="Enter price for card" />
         
          <div>
            <input autoComplete="off" type="checkbox" id="isDeleted" name="isDeleted" />
            <label htmlFor="isDeleted">Deleted or not?</label>
          </div>

          <div className={style.fileInputWrapper}>
            <input autoComplete="off" type="file" id="fileInput" />
            <label htmlFor="fileInput" className={style.fileInputButton}>Choose file</label>
          </div>

          <input autoComplete="off" className={style.input} type="number" placeholder="Enter ID for category" />
          <button type="submit" className={style.submitButton}>Add new card</button>
        </form>
      </div>
    </div>
  );
};
