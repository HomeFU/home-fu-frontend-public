import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { UpdateLocationAPI } from "../../../../api/Admin/Locations/updateLocation";
import { UpdateLocationType } from "../../../../types/Locations/updateLocation";
import style from "./updateLocation.module.scss";

type UpdateLocationModel = {
    id: number;
    name: string;
};

type LocationValidate = {
    name: string;
};

export const UpdateLocation = ({ id, name }: UpdateLocationModel) => {
    const [errorMessage, setErrorMessage] = useState('');
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LocationValidate>({
        defaultValues: { name },
        mode: 'onChange',
    });

    const mutation = useMutation({
        mutationKey: ['location', 'update', id],
        mutationFn: ({ data, id }: { data: UpdateLocationType; id: number }) =>
            UpdateLocationAPI({ data, id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['locations'] });
            reset();
            window.location.reload();
        },
        onError: (error: any) => {
            setErrorMessage(error?.response?.data || 'Ошибка обновления локации');
        },
    });

    const onSubmit: SubmitHandler<LocationValidate> = (data) => {
        mutation.mutate({ data, id });
    };

    return (
        <div className={style.formWrapper}>
            <h2>Update Location</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.formGroup}>
                    <label>Old Name: {name}</label>
                    <input
                        type="text"
                        placeholder="Enter new location name"
                        {...register('name', {
                            required: 'Введите новое имя',
                        })}
                    />
                    {/* {errors.name && <p className={style.error}>{errors.name.message}</p>} */}
                </div>

                {/* {mutation.isError && (
                    <p className={style.errorMessage}>{errorMessage}</p>
                )} */}

                <button type="submit">Update Location</button>
            </form>
        </div>
    );
};
