import style from "./header.module.scss";
import {RegisterButton} from "./RegisterButton/registerbutton";
import {TravetFilter} from "./TravelFilter/travel-filter";
import {MapButton} from "./mapbutton/mapbutton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Auth/authSlice";

export const Header = () => {
    const isAuthenticatedUser = useSelector((state) => state.auth.isAuthenticated);
    
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logout());
    }

    return (
        <header className={style.header}>
            <div className={style.contentTop}>
                <div className={style.logo}><Link to="/">Home<span className={style.logoModifier}>FU</span></Link></div>
                <ul className={style.listMenu}>
                    <li className={style.listItem}><Link to="/">Варіанти помешкань</Link></li> {/**?пока что все ведет на Index */}
                    <li className={style.listItem}><Link to="/">Враження</Link></li>
                    <li className={style.listItem}><Link to="/">Онлайн-враження</Link></li>
                </ul>
                <div className={style.offerListWrapper}>
                    <Link className={style.offerItem} to="/">Запропонувати помешкання на Home<span className={style.logoModifier}>FU</span></Link>
                    {
                        isAuthenticatedUser ? <button onClick={handleLogOut}>LogOut</button> : <RegisterButton></RegisterButton>
                    }
                </div>
            </div>
            <div className={style.contentBottom}>
                <TravetFilter></TravetFilter>
                <MapButton></MapButton>
            </div>
        </header>
    )
}