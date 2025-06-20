import style from "./register.module.scss";
import close from "../../../assets/icons/closeIcon.svg";
import apple from "../../../assets/icons/appleIcon.svg";
import google from "../../../assets/icons/googleIcon.svg";
import facebook from "../../../assets/icons/facebookIconForm.svg";
import { useDispatch } from "react-redux";
import { closeRegisterForm } from "../../../redux/LoginRegisterFormSlice/formSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserModel } from "../../../types/Auth/auth";
import { RegistrationUser } from "../../../api/Auth/authRegistration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { openLoginForm } from "../../../redux/LoginRegisterFormSlice/formSlice";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { ConfirmEmail } from "..//..//..//components/ConfirmEmail/confirmEmail";

type UserValidate = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const Register = () => {
    const [isErrorMessage, setErrorMessage] = useState<string>('');
    const [showConfirmEmail, setShowConfirmEmail] = useState(false);
    const [userEmail, setUserEmail] = useState<string>('');

    const dispatch = useDispatch();

    const { register, reset, formState: { errors }, handleSubmit, watch } = useForm<UserValidate>({ mode: 'onChange' });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['auth', 'register'],
        mutationFn: RegistrationUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
            setUserEmail(watch("email"));
            setShowConfirmEmail(true);
            reset();
        },
        onError: () => {
            setErrorMessage('Ошибка регистрации');
        }
    });

    const onSubmit: SubmitHandler<UserValidate> = (data) => {
        const user: UserModel = {
            email: data.email,
            password: data.password,
        }
        mutation.mutate(user);
    };

if (showConfirmEmail) {
  return <ConfirmEmail email={userEmail} />;
}

    return (
        <div className={style.formCard}>
            <h2 className={style.title}>Register</h2>

            <button className={style.closeButton} onClick={() => dispatch(closeRegisterForm())}>
                <img src={close} alt="close" loading="lazy" />
            </button>

            <form className={style.formContent} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.formGroup}>
                    <input autoComplete="off"
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
                    <input autoComplete="off"
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
                    <input autoComplete="off"
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
                    {mutation.isError ? `Error: ${isErrorMessage} !` : ''}
                </p>

                <button type="submit" className={style.registerButton}>
                    {
                        mutation.isPending ? <BeatLoader color="#ffffff" /> : 'Register'
                    }
                </button>
            </form>

            <div className={style.socialButtons}>
                <button className={style.socialButton}>
                    <img className={style.socialIcon} src={google} alt="googleIcon" loading="lazy" />
                    <span>Sign In with Google</span>
                    <div className={style.comingSoonPopup}>Coming soon</div>
                </button>

                <button className={style.socialButton}>
                    <img className={style.socialIcon} src={facebook} alt="facebookIcon" loading="lazy" />
                    <span>Sign In with Facebook</span>
                    <div className={style.comingSoonPopup}>Coming soon</div>
                </button>

                <button className={style.socialButton}>
                    <img className={style.socialIcon} src={apple} alt="appleIcon" loading="lazy" />
                    <span>Sign In with Apple</span>
                    <div className={style.comingSoonPopup}>Coming soon</div>
                </button>
            </div>
        </div>
    );
};