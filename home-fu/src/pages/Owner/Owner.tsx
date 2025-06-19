import style from './owner.module.scss'
import { HeaderSite } from "../../components/Header/HeaderSite/headerSite"

export const Owner = () => {
    return (
        <>
            <HeaderSite/>
            <main className={style.ownerMainBlock}>
                <form className={style.cardForm}>
                    <div className={style.formGroup}><label>CardName</label><input autoComplete="off" type="text" /></div>
                    <div className={style.formGroup}><label>LocationId</label><input autoComplete="off" type="text" /></div>
                    <div className={style.formGroup}><label>Price</label><input autoComplete="off" type="text" /></div>
                    <div className={style.formGroup}><label>NumberOfGuests</label><input autoComplete="off" type="text" /></div>
                    <div className={style.formGroup}><label>NumberOfBedrooms</label><input autoComplete="off" type="text" /></div>
                    <div className={style.formGroup}><label>NumberOfBeds</label><input autoComplete="off" type="text" /></div>
                    <div className={style.formGroup}><label>NumberOfBathrooms</label><input autoComplete="off" type="text" /></div>
                    <div className={style.formGroup}><label>Description</label><input autoComplete="off" type="text" /></div>
                    <div className={style.formGroup}><label>Latitude</label><input autoComplete="off" type="text" /></div>
                    <div className={style.formGroup}><label>Longitude</label><input  autoComplete="off"type="text" /></div>
                    <div className={style.formGroup}><label>AmenityIds[]</label><input autoComplete="off" type="text" /></div>
                    <div className={style.formGroup}><label>CardImages</label><input autoComplete="off" type="file" multiple /></div>
                    <button type="submit" className={style.submitButton}>Создать карточку</button>
                </form>
            </main>
        </>
    )
}