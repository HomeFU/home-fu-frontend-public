import style from "./addNewLocation.module.scss";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddNewCategoryAPI } from "../../../../api/Admin/Categories/addNewCategory";
import { useState } from "react";
import { CategoryType } from "../../../../types/Categories/addNewCategory";

type CategoryValidate = {
    name:string,
    imageFile: File,
}

export const AddNewCategory = () => {
    const [errorMessage, setErrorMessage] = useState('');

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
        onSuccess:(() => {
            queryClient.invalidateQueries({queryKey: ['category']})
            // window.location.reload();
            console.log("Added!!!");
            reset();
        }),
        onError: (error: any) => {
            setErrorMessage(error?.response?.data || 'Ошибка добавления локации');
        },
    });

    const onSubmit: SubmitHandler<CategoryValidate> = (data) => {
        const file = (data.imageFile as unknown as FileList)[0]; // получить файл из FileList
        mutation.mutate({
            name: data.name,
            imageFile: file,
        });
    };
    

    return (
        <div>
            <h1>Add new category</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Enter name for new category"
                    {...register('name', {
                        required: 'Location name is required',
                    })}
                />
                <span>Add image for category</span>
                <input
                type="file"
                {...register("imageFile", {
                    required: "Image is required",
                })}
                />
                <button type="submit">Add new </button>
            </form>
        </div>
    )
}