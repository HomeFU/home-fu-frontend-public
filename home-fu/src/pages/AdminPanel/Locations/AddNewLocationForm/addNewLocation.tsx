import style from "./addNewLocation.module.scss";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddNewLocationAPI } from "../../../../api/Admin/Locations/addNewLocation";
import { useState } from "react";
import { LocationType } from "../../../../types/Locations/addNewLocation";

type LocationValidate = {
    name: string
}

export const AddNewLocation = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LocationValidate>({ mode: 'onChange' });

    const mutation = useMutation({
        mutationKey: ['location', 'add'],
        mutationFn: AddNewLocationAPI,
        onSuccess:(() => {
            queryClient.invalidateQueries({queryKey: ['location']})
            window.location.reload();
            console.log("Added!!!");
            reset();
        }),
        onError: (error: any) => {
            setErrorMessage(error?.response?.data || 'Ошибка добавления локации');
        },
    });

    const onSubmit:SubmitHandler<LocationType> = (data) => {
        mutation.mutate(data);
    }

    return (
        <div>
            <h1>Add new location</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Enter name for new location"
                    {...register('name', {
                        required: 'Location name is required',
                    })}
                />
                <button type="submit">Add new location</button>
            </form>
        </div>
    )
}