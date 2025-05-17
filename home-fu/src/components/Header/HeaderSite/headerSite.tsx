"use client"

import style from "./headerSite.module.scss"
import { RegisterButton } from "../RegisterButton/registerbutton"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { openCloseMobileMenu } from "../../../redux/MobileMenu/menuSlice"
import { MobileMenu } from "../../MobileMenu/menu"
import { AuthenticatedUserButton } from "../../../features/Auth/ButtonForAuthenticatedUser/authenticatedUserButton"
import { MenuPopoUp } from "../../MenuPopUp/menuPopUp"

export const HeaderSite = () => {
  const dispatch = useDispatch()
  const isOpenMobileMenu = useSelector((state) => state.mobileMenu.isOpen)
  const isAuthenticatedUser = useSelector((state) => state.auth.isAuthenticated)

  const onOpenCloceMobileMenu = () => {
    dispatch(openCloseMobileMenu())
  }

  return (
    <>
      <header className={style.simpleHeader}>
        <div className={style.container}>
          <div className={style.headerContent}>
            <div className={style.logo}>
              <Link to="/">
                Home<span className={style.logoModifier}>FU</span>
              </Link>
            </div>
            <div className={style.rightSection}>
              <Link className={style.offerItem} to="/">
                Запропонувати помешкання на Home<span className={style.logoModifier}>FU</span>
              </Link>
              <div className={style.userMenu}>
                {isAuthenticatedUser ? (
                  <div className={style.userMenuWrapper}>
                    <AuthenticatedUserButton />
                    <MenuPopoUp />
                  </div>
                ) : (
                  <RegisterButton />
                )}
              </div>
            </div>
            <button className={style.menuButton} onClick={onOpenCloceMobileMenu}>
              <div className={style.menuIcon}>
                <span className={isOpenMobileMenu ? style.open : ""} />
                <span className={isOpenMobileMenu ? style.open : ""} />
                <span className={isOpenMobileMenu ? style.open : ""} />
              </div>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  )
}