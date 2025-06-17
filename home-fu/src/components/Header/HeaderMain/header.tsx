import style from "./header.module.scss";
import {RegisterButton} from "..//RegisterButton/registerbutton";
import {TravelFilter} from "..//TravelFilter/travel-filter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { openCloseMobileMenu } from "../../../redux/MobileMenu/menuSlice";
import { MobileMenu } from "../../MobileMenu/menu";
import { FilterBar } from "../../CategoryBar/FilterBar/filterbar";
import { FilterButton } from "../../CategoryBar/FilterButton/filterbutton";
import { AnimalsModal } from ".././TravelFilter/Animals/animals";
import { MenuPopoUp } from "../../MenuPopUp/menuPopUp";
import { AuthenticatedUserButton } from "../../../features/Auth/ButtonForAuthenticatedUser/authenticatedUserButton";
import type { RootState } from "..//..//..//redux/store";
import { SearchParams } from "../../../types/SearchParams/searchParams";

type HeaderProps = {
    onSearch?: (params: SearchParams) => void;
};

export const Header = ({ onSearch }: HeaderProps) => {

    const showScrolledFilter = useSelector((state: RootState) => state.scrolledFilter.isShowScrolledFilter);

    const dispatch = useDispatch();

    const isOpenMobileMenu = useSelector((state: RootState) => state.mobileMenu.isOpen);
    const onOpenCloceMobileMenu = () => {
       dispatch(openCloseMobileMenu());
    }

    const isAuthenticatedUser = useSelector((state: RootState) => state.auth.isAuthenticated);
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
                        <div className={style.offerListWrapper}>
                            <Link className={style.offerItem} to="/">Запропонувати помешкання на Home<span className={style.logoModifier}>FU</span></Link>
                            {
                                isAuthenticatedUser ? <AuthenticatedUserButton/> : <RegisterButton/>
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
                            <TravelFilter onSearch={onSearch}/>
                        </div>
                    </div>
                </div>
                <div className={`${style.main} ${showScrolledFilter ? style.main : style.unsetMainTop}`}>
                    <div className={style.divider}></div>
                    <div className={style.container}>
                        <div className= {style.categoryBar}>
                            <FilterBar/>
                            <div className={style.wrapperFilterSumButton}>
                                <FilterButton/>
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