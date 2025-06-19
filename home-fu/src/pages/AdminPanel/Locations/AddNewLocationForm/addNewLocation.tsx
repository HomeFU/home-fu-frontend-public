 import style from "./addNewLocation.module.scss";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddNewLocationAPI } from "../../../../api/Admin/Locations/addNewLocation";
import { useState } from "react";
import { LocationType } from "../../../../types/Locations/addNewLocation";
import { useDispatch } from "react-redux";
import { closeAddLocationForm } from "../../../../redux/AdminPanel/adminPanel";

type LocationValidate = {
  name: string;
};

export const AddNewLocation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LocationValidate>({ mode: 'onChange' });

  const mutation = useMutation({
    mutationKey: ['location', 'add'],
    mutationFn: AddNewLocationAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['location'] });
      reset();
      dispatch(closeAddLocationForm());
      window.location.reload();
    },
    onError: () => {
      setErrorMessage('Ошибка добавления локации');
    },
  });

  const onSubmit: SubmitHandler<LocationType> = (data) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    dispatch(closeAddLocationForm());
  };

  return (
    <div className={style.modalWrapper} onClick={handleClose}>
      <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        <button className={style.closeButton} onClick={handleClose}>×</button>
        <h2 className={style.title}>Add new location</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.formContent}>
          <input autoComplete="off"
            type="text"
            placeholder="Enter name for new location"
            className={style.input}
            {...register('name', {
              required: 'Location name is required',
            })}
          />
          {errors.name && <p className={style.error}>{errors.name.message}</p>}
          {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
          <button
            type="submit"
            className={style.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Adding...' : 'Add new location'}
          </button>
        </form>
      </div>
    </div>
  );
};