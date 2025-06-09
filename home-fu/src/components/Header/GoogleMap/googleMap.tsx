"use client";

import { useEffect, useRef } from "react";
import styles from "./googleMap.module.scss";

declare global {
  interface Window {
    google: any;
  }
}

type GoogleMapProps = {
  isVisible: boolean;
};

export const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (!isVisible || !mapRef.current) return;

    if (window.google) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    function initMap() {
      new window.google.maps.Map(mapRef.current, {
        center: { lat: 50.4501, lng: 30.5234 },
        zoom: 12
      });
    }

    return () => {
      if (script.parentNode === document.head) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return <div ref={mapRef} className={styles.map} style={{ margin:"0 auto", maxWidth:"1200px" , height: "500px" }} />;
};