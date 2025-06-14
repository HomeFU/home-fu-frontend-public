"use client";

import styles from "./mapbutton.module.scss";
import mapIcon from "../../../assets/icons/iconMap.svg";
import { useEffect } from "react";
import { handlerScrolledFilter } from "../../../redux/TravelFilter/ScrollUpdateFilterSlice/filterUpdateScroll";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

type MapButtonProps = {
  onClick?: () => void;
}

export const MapButton = ({ onClick }: MapButtonProps) => {
  const showScrolledFilter = useSelector((state: RootState) => state.scrolledFilter.isShowScrolledFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    const handlerScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      dispatch(handlerScrolledFilter(scrollTop < 19));
    }
    window.addEventListener("scroll", handlerScroll);
    return () => {
      window.removeEventListener("scroll", handlerScroll);
    }
  }, [showScrolledFilter]);

const handleClick = () => {
  if (onClick) onClick();
  
  const mapElement = document.getElementById('google-map');
  if (mapElement) {
    const yOffset = -300;
    const y = mapElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
};
  return (
    <>
      {showScrolledFilter && (
      <button className={styles.mapButton} onClick={handleClick}>
      <span className={styles.text}>Показати мапу</span>
      <img src={mapIcon} className={styles.icon} loading="lazy" alt="Map icon" />
     </button>
      )}
    </>
  );
}