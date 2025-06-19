import style from "./confirmEmail.module.scss";
import { useDispatch } from "react-redux";
import { closeRegisterForm } from "..//..//redux/LoginRegisterFormSlice/formSlice";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useState } from "react";

export const ConfirmEmail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm<{ code: string }>();

    const onSubmit = (data: { code: string }) => {
        setIsLoading(true);
        console.log('Код підтвердження:', data.code);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className={style.formCard}>
            <h2 className={style.title}>Підтвердіть email</h2>

            <button className={style.closeButton} onClick={() => dispatch(closeRegisterForm())}>
                <img src="/src/assets/icons/closeIcon.svg" alt="close" loading="lazy"/>
            </button>

            <div className={style.description}>
                На вашу пошту надійшов код. Введіть його
            </div>

            <form className={style.formContent} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.formGroup}>
                    <input 
                        autoComplete="off"
                        type="text"
                        placeholder="Код підтвердження"
                        className={style.input}
                        {...register("code", {
                            required: "Будь ласка, введіть код підтвердження",
                            minLength: {
                                value: 6,
                                message: "Код повинен містити мінімум 6 символи",
                            },
                        })}
                    />
                    <p className={style.error}>{errors.code?.message}</p>
                </div>

                <button type="submit" className={style.confirmButton}>
                    {isLoading ? <BeatLoader color="#ffffff" /> : 'Підтвердити'}
                </button>
            </form>
        </div>
    );
};