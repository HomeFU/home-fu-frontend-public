import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateCategoryAPI } from '../../../../api/Admin/Categories/updateCategory';
import { useState } from 'react';
import style from './updateCategoriesForm.module.scss';

type UpdateCategoryModel = {
  id: number;
  name: string;
  imageUrl: string;
};

type CategoryFormData = {
  name: string;
  imageFile: FileList; // FileList от input type="file"
};

export const UpdateCategory = ({ id, imageUrl, name }: UpdateCategoryModel) => {
  const [errorMessage, setErrorMessage] = useState('');
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
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      reset();
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
    <div className={style.formWrapper}>
      <h2>Update Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
          <label>Old Name: {name}</label>
          <input
            type="text"
            placeholder="Enter new category name"
            {...register('name')}
          />
          {errors.name && <p>{errors.name.message}</p>}

          <span>Add image for category</span>
          <input
            type="file"
            {...register('imageFile')}
          />
          {errors.imageFile && <p>{errors.imageFile.message}</p>}
        </div>

        {errorMessage && <p className={style.error}>{errorMessage}</p>}
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};
