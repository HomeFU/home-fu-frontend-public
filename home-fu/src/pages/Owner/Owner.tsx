import style from './owner.module.scss'
import { HeaderSite } from "../../components/Header/HeaderSite/headerSite"
import { useMutation, useQuery } from '@tanstack/react-query'
import { LocationModel } from '../../types/Locations/locations'
import { Locations } from '../../api/Locations/locations'
import { useForm, Controller } from 'react-hook-form'
import Select from "react-select"
import { AmenitiesModel } from '../../types/Amenities/amenities'
import { Amenities } from '../../api/Amenities/amenities'
import { CreateOwnerCards } from '../../api/CreateOwnerCard/createOwnerCard'
import { CategoriesModel } from '../../types/Categories/categories'
import { Categories } from '../../api/Categories/categories'

type FormValues = {
  cardName: string
  locationId: number
  categoryId: number[]
  price: string
  numberOfGuests: string
  numberOfBedrooms: string
  numberOfBeds: string
  numberOfBathrooms: string
  description: string
  latitude: string
  longitude: string
  amenityIds: number[]
  cardImages: FileList
}

export const Owner = () => {
  const { data: dataLocations = [] } = useQuery<LocationModel[]>({
    queryKey: ['location'],
    queryFn: () => Locations()
  });

  const { data: dataFullAmenities = [] } = useQuery<AmenitiesModel[]>({
    queryKey: ['amenities'],
    queryFn: () => Amenities()
  });

  const { data: dataCategories = [] } = useQuery<CategoriesModel[]>({
    queryKey: ['categories'],
    queryFn: () => Categories()
  });

  const { control, handleSubmit, register } = useForm<FormValues>();

  const locationOptions = dataLocations.map(location => ({
    value: location.id,
    label: location.name
  }));

  const mutation = useMutation({
    mutationFn: (formData: FormData) => CreateOwnerCards(formData),
    onSuccess: (data) => {
      console.log("Card created:", data);
    },
    onError: (error) => {
      console.error("Error creating card:", error);
    }
  });

  const onSubmit = (data: FormValues) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found in localStorage");
      return;
    }

    const formData = new FormData();
    formData.append("CardName", data.cardName);
    formData.append("LocationId", String(data.locationId));
    formData.append("Price", data.price);
    formData.append("NumberOfGuests", data.numberOfGuests);
    formData.append("NumberOfBedrooms", data.numberOfBedrooms);
    formData.append("NumberOfBeds", data.numberOfBeds);
    formData.append("NumberOfBathrooms", data.numberOfBathrooms);
    formData.append("Description", data.description);
    formData.append("Latitude", data.latitude);
    formData.append("Longitude", data.longitude);
    formData.append("HostId", userId);

    data.amenityIds.forEach(id => {
      formData.append("AmenityIds[]", String(id));
    });

    data.categoryId.forEach(id => {
      formData.append("CategoryIds[]", String(id));
    });

    Array.from(data.cardImages).forEach((file) => {
      formData.append("CardImages", file);
    });

    mutation.mutate(formData);
  };

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
            <label>Локация</label>
            <Controller
              control={control}
              name="locationId"
              render={({ field }) => (
                <Select
                  {...field}
                  options={locationOptions}
                  placeholder="Выберите локацию"
                  value={locationOptions.find(option => option.value === field.value)}
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
                    }),
                    singleValue: (base) => ({
                      ...base,
                      overflow: "visible",
                    }),
                    indicatorSeparator: () => ({ display: "none" }),
                    valueContainer: (base) => ({ ...base, padding: 0 }),
                  }}
                />
              )}
            />
          </div>

          <div className={style.formGroup}>
            <label>Категория</label>
            <Controller
              control={control}
              name="categoryId"
              defaultValue={[]}
              render={({ field }) => (
                <div className={style.categoryWrapper}>
                  {dataCategories.map(category => (
                    <label key={category.id} className={style.customCheckbox}>
                      <input
                        type="checkbox"
                        value={category.id}
                        checked={field.value?.includes(category.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const value = Number(e.target.value);
                          if (checked) {
                            field.onChange([...field.value, value]);
                          } else {
                            field.onChange(field.value.filter((id) => id !== value));
                          }
                        }}
                      />
                      <span className={style.checkmark}></span>
                      {category.name}
                    </label>
                  ))}
                </div>
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
            <span>Удобства (Amenities)</span>
            <Controller
              control={control}
              name="amenityIds"
              defaultValue={[]}
              render={({ field }) => (
                <div className={style.amenitiesWrapper}>
                  {dataFullAmenities.map(amenity => (
                    <label key={amenity.id} className={style.customCheckbox}>
                      <input
                        type="checkbox"
                        value={amenity.id}
                        checked={field.value?.includes(amenity.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const value = Number(e.target.value);
                          if (checked) {
                            field.onChange([...field.value, value]);
                          } else {
                            field.onChange(field.value.filter((id) => id !== value));
                          }
                        }}
                      />
                      <span className={style.checkmark}></span>
                      {amenity.name}
                    </label>
                  ))}
                </div>
              )}
            />
          </div>

          <div className={style.formGroup}>
            <label className={style.formGroup}>Card Images</label>
            <input type="file" multiple {...register("cardImages")} />
          </div>

          <button type="submit" className={style.submitButton}>Создать карточку</button>
        </form>
      </main>
    </>
  );
};
