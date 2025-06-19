import style from './owner.module.scss'
import { HeaderSite } from "../../components/Header/HeaderSite/headerSite"

export const Owner = () => {
    return (
        <>
            <HeaderSite/>
            <main className={style.ownerMainBlock}>
                <form className={style.cardForm}>
                    <div className={style.formGroup}><label>CardName</label><input type="text" /></div>
                    <div className={style.formGroup}><label>LocationId</label><input type="text" /></div>
                    <div className={style.formGroup}><label>Price</label><input type="text" /></div>
                    <div className={style.formGroup}><label>NumberOfGuests</label><input type="text" /></div>
                    <div className={style.formGroup}><label>NumberOfBedrooms</label><input type="text" /></div>
                    <div className={style.formGroup}><label>NumberOfBeds</label><input type="text" /></div>
                    <div className={style.formGroup}><label>NumberOfBathrooms</label><input type="text" /></div>
                    <div className={style.formGroup}><label>Description</label><input type="text" /></div>
                    <div className={style.formGroup}><label>Latitude</label><input type="text" /></div>
                    <div className={style.formGroup}><label>Longitude</label><input type="text" /></div>
                    <div className={style.formGroup}><label>AmenityIds[]</label><input type="text" /></div>
                    <div className={style.formGroup}><label>CardImages</label><input type="file" multiple /></div>
                    <button type="submit" className={style.submitButton}>Создать карточку</button>
                </form>
            </main>
        </>
    )
}