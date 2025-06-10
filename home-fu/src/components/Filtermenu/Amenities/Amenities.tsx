"use client"

import styles from "./Amenities.module.scss"
import { AmenityCategoty } from "../../../api/Categories/amenityCategory"
import { useQuery } from "@tanstack/react-query"
import { AmenityCategoryModel } from "../../../types/Categories/amenityCategory"

export  const Amenities = () => {
  const {
    data
  } = useQuery<AmenityCategoryModel[]>({
    queryKey: ['AmenityCategoryModel'],
    queryFn: () => AmenityCategoty()
  })

  return (
    <>
      <h3 className={styles.sectionTitle}>Зручності</h3>
      <div className={styles.amenitiesWrapper}>
        <h4 className={styles.categoryTitle}></h4>
        <div className={styles.wrapperButton}>
          {data?.map((item) => (
            <div key={item.id} className={styles.amenityButton}>
              <img className={styles.imageIcon} src={`https://homefu.azurewebsites.net${item.iconPath}`} alt="" />
              <h4 className={styles.categoryTitle}>{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}