import style from "./header.module.scss";
import RegisterButton from "./RegisterButton/registerbutton";
const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.content}>
                <div className={style.logo}><a>HomeFU</a></div>
                <ul className={style.listMenu}>
                    <li className={style.listItem}><a>Варіанти помешкань</a></li>
                    <li className={style.listItem}><a>Враження</a></li>
                    <li className={style.listItem}><a>Онлайн-враження</a></li>
                </ul>
                <div>
                    <RegisterButton></RegisterButton>
                </div>
            </div>
        </header>
    )
}

export default Header