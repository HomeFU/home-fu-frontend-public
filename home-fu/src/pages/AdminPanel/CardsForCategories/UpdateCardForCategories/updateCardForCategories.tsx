import style from "./updateCardForCategories.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { closeUpdateCardForm } from "../../../../redux/AdminPanel/adminCardUpdate";

export const UpdateCardForCategories = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.cardFormUpdate.isOpenUpdateCardForm);

  const handleClose = () => {
    dispatch(closeUpdateCardForm());
  };

  return (
    <div className={style.modalWrapper} onClick={handleClose} style={{ display: isOpen ? "flex" : "none" }}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={handleClose} type="button" aria-label="Закрыть">
          &times;
        </button>
        <h1 className={style.title}>Update card</h1>
        <form className={style.formContent}>
          <input autoComplete="off" className={style.input} type="text" placeholder="Enter new name for card" />
          <input autoComplete="off" className={style.input} type="number" placeholder="Enter new locatinId for card"/>
          <input autoComplete="off" className={style.input} type="text" placeholder="Enter new locatin name for card"/>
          <div className={style.dateInputRow}>
            <span>Enter new start date</span>
            <input autoComplete="off" className={style.input} type="date"/>
          </div>
          <div className={style.dateInputRow}>
            <span>Enter new end date</span>
            <input autoComplete="off" className={style.input} type="date"/>
          </div>
          <input autoComplete="off" className={style.input} type="number" placeholder="Enter new rating for card"/>
          <input autoComplete="off" className={style.input} type="number" placeholder="Enter new price for card"/>
          <div>
            <input autoComplete="off" type="checkbox" id="isDeleted" name="isDeleted" />
            <label htmlFor="isDeleted">Deleted or not?</label>
          </div>
          <div className={style.fileInputWrapper}>
            <input autoComplete="off" type="file" id="fileInput" />
            <label htmlFor="fileInput" className={style.fileInputButton}>Select images</label>
          </div>
          <input autoComplete="off" className={style.input} type="number" placeholder="Enter new ID for category"/>
          <button type="submit" className={style.submitButton}>Update card</button>
        </form>
      </div>
    </div>
  );
}