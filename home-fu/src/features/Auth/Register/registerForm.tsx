import style from "./register.module.scss";
import close from "../../../assets/icons/closeIcon.svg";
import apple from "../../../assets/icons/appleIcon.svg";
import google from "../../../assets/icons/googleIcon.svg";
import facebook from "../../../assets/icons/facebookIconForm.svg";
import { useDispatch } from "react-redux";
import { closeRegisterForm } from "../../../redux/LoginRegisterFormSlice/formSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserModel } from "../../../types/Auth/auth";
import { RegistrationUser } from "../../../api/Auth/auth";
import { useMutation } from "@tanstack/react-query";
import { openLoginForm } from "../../../redux/LoginRegisterFormSlice/formSlice";
import { useState } from "react";

type UserValidate = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const Register = () => {
    const [isErrorMessage, setErrorMessage] = useState<string>('');

    const dispatch = useDispatch();

    const { register, reset, formState: { errors },  handleSubmit, watch} = useForm<UserValidate>({mode:'onChange'});

    const mutation = useMutation({
        mutationFn: RegistrationUser,
        onSuccess: () => {
            dispatch(openLoginForm());
            reset();
        },
        onError: (error) => {
            setErrorMessage(error.response.data);
        }
    });

    const onSubmit: SubmitHandler<UserValidate> = (data) => {
       
        const user:UserModel = {
            email: data.email,
            password: data.password,
        }

        mutation.mutate(user);
    };

    return (
        <div className={style.formCard}>
            <h2 className={style.title}>Register</h2>

            <button className={style.closeButton} onClick={() => dispatch(closeRegisterForm())}>
                <img src={close} alt="close" />
            </button>

            <form className={style.formContent} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.formGroup}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={style.input}
                        {...register("email", {
                            required: "Please enter your email.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    <p className={style.error}>{errors.email?.message}</p>
                </div>

                <div className={style.formGroup}>
                    <input
                        type="password"
                        placeholder="Password"
                        className={style.input}
                        {...register("password", {
                            required: "Please enter your password.",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long",
                            },
                        })}
                    />
                    <p className={style.error}>{errors.password?.message}</p>
                </div>

                <div className={style.formGroup}>
                    <input
                        type="password"
                        placeholder="Repeat password"
                        className={style.input}
                        {...register("confirmPassword", {
                            required: "Please confirm your password.",
                            validate: (value) =>
                                value === watch("password") || "Passwords do not match",
                        })}
                    />
                    <p className={style.error}>{errors.confirmPassword?.message}</p>
                </div>

                <p className={style.errorMessage}>
                    { mutation.isError ? `Error: ${isErrorMessage} !` : '' }
                </p>

                <button type="submit" className={style.registerButton}>
                    Register
                </button>
            </form>

            <div className={style.socialButtons}>
                <button className={style.socialButton}>
                    <img className={style.socialIcon} src={google} alt="googleIcon" />
                    <span>Sign In with Google</span>
                </button>

                <button className={style.socialButton}>
                    <img className={style.socialIcon} src={facebook} alt="facebookIcon" />
                    <span>Sign In with Facebook</span>
                </button>

                <button className={style.socialButton}>
                    <img className={style.socialIcon} src={apple} alt="appleIcon" />
                    <span>Sign In with Apple</span>
                </button>
            </div>
        </div>
    );
};

