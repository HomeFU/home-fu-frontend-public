import style from "./addNewCategoryForm.module.scss";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddNewCategoryAPI } from "../../../../api/Admin/Categories/addNewCategory";
import { useState } from "react";

type CategoryValidate = {
  name: string;
  imageFile: FileList;
};

type AddNewCategoryProps = {
  onClose: () => void;
};

export const AddNewCategory = ({ onClose }: AddNewCategoryProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryValidate>({ mode: 'onChange' });

  const mutation = useMutation({
    mutationKey: ['category', 'add'],
    mutationFn: AddNewCategoryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
      reset();
      onClose();
      window.location.reload();
    },
    onError: () => {
      setErrorMessage('Ошибка добавления категории');
    },
  });

  const onSubmit: SubmitHandler<CategoryValidate> = (data) => {
    const file = data.imageFile[0];
    mutation.mutate({
      name: data.name,
      imageFile: file,
    });
  };

  return (
    <div
      className={style.modalWrapper}
      onClick={onClose}
    >
      <div
        className={style.modalContent}
        onClick={e => e.stopPropagation()} 
      >
        <button
          className={style.closeButton}
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        >
          &times;
        </button>
        <h1 className={style.title}>Add new category</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={style.formContent}>
          <input autoComplete="off"
            className={style.input}
            type="text"
            placeholder="Enter name for new category"
            {...register('name', {
              required: 'Category name is required',
            })}
          />
          {errors.name && <p className={style.error}>{errors.name.message}</p>}
          
          <span>Add image for category</span>
          <div className={style.fileInputWrapper}>
            <input autoComplete="off"
              type="file"
              id="fileInput"
              {...register('imageFile', {
                required: 'Image is required',
              })}
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            />
            <label htmlFor="fileInput" className={style.fileInputButton}>
              {fileName || 'Choose file'}
            </label>
          </div>
          {errors.imageFile && <p className={style.error}>{errors.imageFile.message}</p>}
          
          {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
          <button type="submit" className={style.submitButton}>
            Add new
          </button>
        </form>
      </div>
    </div>
  );
};