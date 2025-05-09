import style from "./details.module.scss"
import { Header } from "..//..//components/Header/HeaderMain/header"
import { FooterMain } from "../../components/Footer/footerMain"
export const Details = () => {
    return (
        <>
         <Header/>
            <main className={style.main}>
                <div className={style.divider}></div>
                <div className={style.container}>
                    <h1>Hello , this is Page Details</h1>
                </div>
            </main>
         <FooterMain/>
        </>
    )
}