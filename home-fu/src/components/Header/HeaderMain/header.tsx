import style from "./header.module.scss";
import {RegisterButton} from "..//RegisterButton/registerbutton";
import {TravetFilter} from "..//TravelFilter/travel-filter";
import {MapButton} from "..//MapButton/mapbutton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOutButton } from "..//../../features/Auth/LogOut/logOutButton";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { openCloseMobileMenu } from "../../../redux/MobileMenu/menuSlice";
import { MobileMenu } from "../../MobileMenu/menu";
import { FilterBar } from "../../../pages/CategoryBar/FilterBar/filterbar";
import { FilterButton } from "../../../pages/CategoryBar/FilterButton/filterbutton";
import { SumButton } from "../../../pages/CategoryBar/SumButton/sumbutton";
import { AnimalsModal } from ".././TravelFilter/Animals/animals";
import { MenuPopoUp } from "../../MenuPopUp/menuPopUp";
import { toggleMenuPopUp } from "../../../redux/MenuPopoUp/menuPopoUpSlice";
export const Header = () => {

    const showScrolledFilter = useSelector((state) => state.scrolledFilter.isShowScrolledFilter);

    const dispatch = useDispatch();

    const isOpenMobileMenu = useSelector((state) => state.mobileMenu.isOpen);
    const onOpenCloceMobileMenu = () => {
       dispatch(openCloseMobileMenu());
    }

    const isAuthenticatedUser = useSelector((state) => state.auth.isAuthenticated);
    const [isOpenCloseFilterMobile, setOpenCloseFilterMobile] = useState(false);

    const HandleOpenCloseFilter = () => {
        setOpenCloseFilterMobile((prev) => !prev)
    }

    return (
        <>
            <header className={style.header}>
                <div className={style.container}>
                    <div className={style.contentTop}>
                        <div className={style.logo}><Link to="/">Home<span className={style.logoModifier}>FU</span></Link></div>
                        {
                            showScrolledFilter && <ul className={style.listMenu}>
                                <li className={style.listItem}><Link to="/">Варіанти помешкань</Link></li> {/**?пока что все ведет на Index */}
                                <li className={style.listItem}><Link to="/">Враження</Link></li>
                                <li className={style.listItem}><Link to="/">Онлайн-враження</Link></li>
                            </ul>
                        }
                        <MenuPopoUp/>
                        <div className={style.offerListWrapper} onClick={() => {dispatch(toggleMenuPopUp())}}>
                            <Link className={style.offerItem} to="/">Запропонувати помешкання на Home<span className={style.logoModifier}>FU</span></Link>
                            {
                                isAuthenticatedUser ? <LogOutButton/> : <RegisterButton/>
                            }
                        </div>
                        <button
                            className={style.menuButton}
                            onClick={onOpenCloceMobileMenu}
                            >
                            <div className={style.menuIcon}>
                                <span className={isOpenMobileMenu ? style.open : ''} />
                                <span className={isOpenMobileMenu ? style.open : ''} />
                                <span className={isOpenMobileMenu ? style.open : ''} />
                            </div>
                        </button>
                    </div>
                    <div className={style.contentBottom}>
                        <button className={style.buttonShowClose} onClick={HandleOpenCloseFilter}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='sm' style={{color: "#000"}}/>
                            {
                                isOpenCloseFilterMobile ? "Завершити пошук" : "Почати пошук"
                            }
                        </button>
                        <div className={`${style.wrapperTravelFilter} ${isOpenCloseFilterMobile ? style.showTravelFilter : ''}`}>
                            <TravetFilter></TravetFilter>
                            <MapButton></MapButton>
                        </div>
                    </div>
                </div>
                <div className={`${style.main} ${showScrolledFilter ? style.main : style.unsetMainTop}`}>
                    <div className={style.divider}></div>
                    <div className={style.container}>
                        <div className= {style.categoryBar}>
                            <FilterBar></FilterBar>
                            <div className={style.wrapperFilterSumButton}>
                                <FilterButton></FilterButton>
                                <SumButton></SumButton>
                            </div>
                        </div>
                    </div>
                </div> 
            </header>
            <MobileMenu/>
            <AnimalsModal/>
        </>
    )
}