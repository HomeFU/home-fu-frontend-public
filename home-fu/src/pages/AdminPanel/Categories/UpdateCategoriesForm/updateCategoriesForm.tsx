import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateCategoryAPI } from '../../../../api/Admin/Categories/updateCategory';
import { useState } from 'react';
import style from './updateCategoriesForm.module.scss';

type UpdateCategoryModel = {
  id: number;
  name: string;
  imageUrl: string;
  onClose: () => void;
};

type CategoryFormData = {
  name: string;
  imageFile: FileList;
};

export const UpdateCategory = ({ id, imageUrl, name, onClose }: UpdateCategoryModel) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    defaultValues: { name },
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationKey: ['category', 'update', id],
    mutationFn: ({ data, id }: { data: { name: string; imageFile: File }; id: number }) =>
      UpdateCategoryAPI({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
      reset();
      onClose();
      window.location.reload();
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data || 'Ошибка обновления категории');
    },
  });

  const onSubmit: SubmitHandler<CategoryFormData> = (data) => {
    const file = data.imageFile[0];
    mutation.mutate({
      data: {
        name: data.name,
        imageFile: file,
      },
      id,
    });
  };

  return (
    <div className={style.modalWrapper} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={style.closeButton}
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        >
          &times;
        </button>
        <h2 className={style.title}>Update Category</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.formContent}>
          <div className={style.formGroup}>
            <label>Old Name: {name}</label>
            <input
              type="text"
              placeholder="Enter new category name"
              {...register('name', { required: 'Name is required' })}
              className={style.input}
            />
            {errors.name && <p className={style.error}>{errors.name.message}</p>}

            <span>Add image for category</span>
            <div className={style.fileInputWrapper}>
              <input
                type="file"
                id="fileInput"
                {...register('imageFile', { required: 'Image is required' })}
                onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              />
              <label htmlFor="fileInput" className={style.fileInputButton}>
                {fileName || 'Choose file'}
              </label>
            </div>
            {errors.imageFile && <p className={style.error}>{errors.imageFile.message}</p>}
          </div>

          {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
          <button type="submit" className={style.submitButton}>
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};