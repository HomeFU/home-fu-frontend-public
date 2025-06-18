"use client";
import { useCallback } from "react";
import { GoogleMap as GoogleMapApi, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CardDetailsModel } from "../../../types/DatailsCard/details";
import { CardDetailsApi } from "../../../api/CardDetails/cardDetails";
import styles from "./googleMap.module.scss";

export const GoogleMap = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery<CardDetailsModel>({
    queryKey: ["cardDetails", id],
    queryFn: () => CardDetailsApi(id!),
    enabled: !!id,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    language: "uk",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    if (data?.latitude && data?.longitude) {
      const bounds = new window.google.maps.LatLngBounds({
        lat: data.latitude,
        lng: data.longitude,
      });
      map.fitBounds(bounds);
    }
  }, [data]);

  if (!isLoaded || isLoading || !data?.latitude || !data?.longitude) {
    return;
  }

  return (
    <div className={styles.mapWrapper}>
      <GoogleMapApi
        mapContainerClassName={styles.map}
        center={{ lat: data.latitude, lng: data.longitude }}
        zoom={12}
        options={{
          minZoom: 1,
          maxZoom: 12,
        }}
        onLoad={onLoad}
      >
        <Marker position={{ lat: data.latitude, lng: data.longitude }} />
      </GoogleMapApi>
    </div>
  );
};