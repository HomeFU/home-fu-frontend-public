"use client";
import { useEffect, useRef } from "react";
import styles from "./googleMap.module.scss";

export const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      const mapElement = mapRef.current;
      if (!mapElement) return;

      new window.google.maps.Map(mapElement, {
        center: { lat: 50.4501, lng: 30.5234 },
        zoom: 12,
      });
    };
    if (window.google?.maps) {
      initMap();
      return;
    }


    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className={styles.map}
      style={{
        margin: "0 auto",
        maxWidth: "1200px",
        height: "500px",
      }}
    />
  );
};
