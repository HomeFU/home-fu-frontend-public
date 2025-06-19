import style from './owner.module.scss'
import { HeaderSite } from "../../components/Header/HeaderSite/headerSite"
import { useQuery } from '@tanstack/react-query'
import { LocationModel } from '../../types/Locations/locations'
import { Locations } from '../../api/Locations/locations'
import { useForm, Controller } from 'react-hook-form'
import Select from "react-select"

type FormValues = {
  cardName: string
  locationId: number
  price: string
  numberOfGuests: string
  numberOfBedrooms: string
  numberOfBeds: string
  numberOfBathrooms: string
  description: string
  latitude: string
  longitude: string
  amenityIds: string
  cardImages: FileList
}

export const Owner = () => {
  const {
    data: dataLocations = []
  } = useQuery<LocationModel[]>({
    queryKey: ['location'],
    queryFn: () => Locations()
  })

  const { control, handleSubmit, register } = useForm<FormValues>()

  const options = dataLocations.map(location => ({
    value: location.id,
    label: location.name
  }))

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <>
      <HeaderSite />
      <main className={style.ownerMainBlock}>
        <form className={style.cardForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.formGroup}>
            <label>Card Name</label>
            <input type="text" {...register("cardName")} />
          </div>

          <div className={style.formGroup}>
            <label>Location</label>
            <Controller
              control={control}
              name="locationId"
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  placeholder="Выберите локацию"
                  value={options.find(option => option.value === field.value)}
                  onChange={(option) => field.onChange(option?.value)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      borderBottom: "1px solid #ccc",
                      borderRadius: 0,
                      boxShadow: "none",
                      backgroundColor: "transparent",
                      minHeight: "40px",
                      padding: 0,
                      overflow: "visible",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      overflow: "visible",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      padding: 0,
                    }),
                  }}
                />
              )}
            />
          </div>

          <div className={style.formGroup}>
            <label>Price</label>
            <input type="text" {...register("price")} />
          </div>

          <div className={style.formGroup}>
            <label>Number Of Guests</label>
            <input type="text" {...register("numberOfGuests")} />
          </div>

          <div className={style.formGroup}>
            <label>Number Of Bedrooms</label>
            <input type="text" {...register("numberOfBedrooms")} />
          </div>

          <div className={style.formGroup}>
            <label>Number Of Beds</label>
            <input type="text" {...register("numberOfBeds")} />
          </div>

          <div className={style.formGroup}>
            <label>Number Of Bathrooms</label>
            <input type="text" {...register("numberOfBathrooms")} />
          </div>

          <div className={style.formGroup}>
            <label>Description</label>
            <input type="text" {...register("description")} />
          </div>

          <div className={style.formGroup}>
            <label>Latitude</label>
            <input type="text" {...register("latitude")} />
          </div>

          <div className={style.formGroup}>
            <label>Longitude</label>
            <input type="text" {...register("longitude")} />
          </div>

          <div className={style.formGroup}>
            <label>Amenity Ids[]</label>
            <input type="text" {...register("amenityIds")} />
          </div>

          <div className={style.formGroup}>
            <label>Card Images</label>
            <input type="file" multiple {...register("cardImages")} />
          </div>

          <button type="submit" className={style.submitButton}>Создать карточку</button>
        </form>
      </main>
    </>
  )
}
