"use client"

import type React from "react"
import {useRef, useEffect} from "react"
import styles from "./profile.module.scss"
import cameraIcon from "..//..//assets/icons/cameraIcon.svg"
import Select from "react-select"
import { HeaderSite } from "..//..//components/Header/HeaderSite/headerSite"
import { FooterSite } from "../../components/Footer/FooterSite/footerSite"
import { useFullInfoUser } from "../../hooks/useFullUserInfo"
import NoUserPhoto from "../../assets/images/noPhotoUser.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { UpdateInfoAboutUser } from "../../api/Profile/updateUserData"
import { AddUserPhoto } from "../../api/Profile/addUserPhoto"

type Option = {
  value: string;
  label: string;
};

type UserValidate = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  birthDate: string;
  gender: string;
};

export const Profile: React.FC = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem("token") as string;

  const options: Option[] = [
    { value: "Man", label: "Чоловік" },
    { value: "Woman", label: "Жінка" },
    { value: "Other", label: "Інше" },
  ];

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (!file || !fullInfoUserData.id || !token) return;
  
    try {
      await AddUserPhoto(fullInfoUserData.id, token, file);
      queryClient.invalidateQueries({ queryKey: ['fullInfoUser'] });
      window.location.reload();
    } catch (error) {
      alert("Ошибка при загрузке фото");
      console.error("Ошибка при загрузке фото:", error);
    }
  };
  
  const {
    data: fullInfoUserData = {},
    isSuccess,
  } = useFullInfoUser(token);

  const mutation = useMutation({
    mutationFn: UpdateInfoAboutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fullInfoUser'] });
      window.location.reload();
    },
    onError: (error) => {
      console.error("Update error:", error);
    }
  });
  
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {isDirty}
  } = useForm<UserValidate>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      birthDate: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (isSuccess && fullInfoUserData) {
      reset({
        ...fullInfoUserData,
        birthDate: fullInfoUserData.birthDate?.slice(0, 10) || "",
      });
    }
  }, [fullInfoUserData, reset, isSuccess]);

  const onSubmit: SubmitHandler<UserValidate> = (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      address: data.address,
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
      ...(data.gender && { gender: data.gender }),
      ...(data.birthDate && { birthDate: data.birthDate }),
    };
  
    mutation.mutate({
      token,
      id: fullInfoUserData.id,
      data: userData,
    });
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <HeaderSite />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <form className={styles.profileContent} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.wrapperProfileContent}>
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  {fullInfoUserData.profileImageUrl ? (
                    <img
                      src={`https://homefuserverback.azurewebsites.net${fullInfoUserData.profileImageUrl}`}
                      alt="User avatar"
                      className={styles.avatarImage}
                    />
                  ) : (
                    <img className={styles.userImage} loading="lazy" src={NoUserPhoto} alt="userPhoto" />
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={handleAvatarChange}
                  />
                </div>
                <button className={styles.avatarUpload} onClick={triggerFileInput} type="button">
                  <img src={cameraIcon} alt="Camera" className={styles.cameraIcon} />
                  Додати
                </button>
              </div>

              <div className={styles.contentSection}>
                <div className={styles.profileHeader}>
                  <h1>Ваш профіль</h1>
                  <p className={styles.profileDescription}>
                    Інформацію, яку ви надаєте, буде використовувано на <span className={styles.brandName}>HomeFU</span>, щоб інші гості й господарі мали змогу познайомитися з вами.{" "}
                    <a href="#" className={styles.moreLink}>
                      Докладніше
                    </a>
                  </p>
                </div>

                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <input {...register("firstName")} type="text" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Ім'я</span>
                  </div>

                  <div className={styles.field}>
                    <input {...register("lastName")} type="text" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Прізвище</span>
                  </div>

                  <div className={styles.field}>
                    <input {...register("email")} readOnly type="email" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Електронна пошта</span>
                  </div>

                  <div className={styles.field}>
                    <input {...register("phoneNumber")} type="tel" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Телефон</span>
                  </div>

                  <div className={styles.field}>
                    <input {...register("address")} type="text" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Адреса</span>
                  </div>

                  <div className={styles.field}>
                    <input {...register("emergencyContactName")} type="text" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Ім'я екстреного контакту</span>
                  </div>

                  <div className={styles.field}>
                    <input {...register("emergencyContactPhone")} type="text" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Екстрений контакт</span>
                  </div>

                  <div className={`${styles.field} ${styles.fieldSelect}`}>
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          placeholder="Оберіть стать"
                          value={options.find((option) => option.value === field.value)}
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

                  <div className={`${styles.field} ${styles.fieldHappyDate}`}>
                    <input {...register("birthDate")} type="date" className={styles.fieldInput} placeholder=" " />
                    <span className={styles.fieldLabel}>Дата народження</span>
                  </div>
                </div>

                <button type="submit" className={styles.updateButton} disabled={!isDirty}>
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <FooterSite />
    </>
  );
};
