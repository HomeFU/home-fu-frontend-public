import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { UpdateLocationAPI } from "../../../../api/Admin/Locations/updateLocation";
import { UpdateLocationType } from "../../../../types/Locations/updateLocation";
import style from "./updateLocation.module.scss";
import { useDispatch } from "react-redux";
import { closeUpdateLocationForm } from "../..//..//..//redux/AdminPanel/editPanelFirst";

type UpdateLocationModel = {
    id: number | null;
    name: string;
};

type LocationValidate = {
    name: string;
};

export const UpdateLocation = ({ id, name }: UpdateLocationModel) => {
    const [errorMessage, setErrorMessage] = useState('');
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

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
            dispatch(closeUpdateLocationForm());
            window.location.reload();
        },
        onError: () => {
            setErrorMessage('Ошибка обновления локации');
        },
    });

    const onSubmit: SubmitHandler<LocationValidate> = (data) => {
        if (id !== null) {
            mutation.mutate({ data, id });
        }
    };

    const handleClose = () => {
        dispatch(closeUpdateLocationForm());
    };

    return (
        <div className={style.modalWrapper} onClick={handleClose}>
            <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                <button className={style.closeButton} onClick={handleClose}>×</button>
                <h2 className={style.title}>Update Location</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={style.formContent}>
                    <p className={style.oldName}>Old Name: {name}</p>
                    <input autoComplete="off"
                        type="text"
                        placeholder="Enter new location name"
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
                        {mutation.isPending ? 'Updating...' : 'Update Location'}
                    </button>
                </form>
            </div>
        </div>
    );
};