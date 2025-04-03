import style from "./login.module.scss";
import close from "../../../assets/icons/closeIcon.svg";
import apple from "../../../assets/icons/appleIcon.svg";
import google from "../../../assets/icons/googleIcon.svg";
import facebook from "../../../assets/icons/facebookIconForm.svg";
import { useDispatch } from "react-redux";
import { closeLoginForm, openRegisterForm } from "../../../redux/LoginRegisterFormSlice/formSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserModel } from "../../../types/Auth/auth";
import { UserLogin } from "../../../api/Auth/authLogin";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { login } from "../../../redux/Auth/authSlice";

type UserValidate = {
    email: string;
    password: string;
}

export const Login = () => {
    const [isErrorMessage, setErrorMessage] = useState<string>('');

    const dispatch = useDispatch();

    const {register, reset, formState: {errors}, handleSubmit} = useForm<UserValidate>({mode:"onChange"});

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['auth', 'login'],
        mutationFn: UserLogin, 
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['auth'] });
            dispatch(closeLoginForm());
            dispatch(login(data));
            reset();
            console.log(data);
        },
        onError: (error) => {
            setErrorMessage(error.response.data || 'Ошибка авторизации')
        }
    });

    const onSubmit: SubmitHandler<UserValidate> = (data) => {
        const user:UserModel = {
            email: data.email,
            password: data.password
        }
        mutation.mutate(user);
        console.log(user);
    }

    return (
        <div className={style.formCard} onClick={(e) => {e.stopPropagation()}}>
            <h2 className={style.title}>Login</h2>

            <button className={style.closeButton} onClick={() => dispatch(closeLoginForm())}>
                <img src={close} alt="close" />
            </button>

            <form className={style.formContent} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.formGroup}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={style.input}
                        { ...register("email", {
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

                <p className={style.errorMessage}>
                    { mutation.isError ? `Error: ${isErrorMessage} !` : '' }
                </p>

                <button type="submit" className={style.loginButton}>
                    {
                        mutation.isPending ? <BeatLoader color="#ffffff" /> : "Login"
                    }
                </button>
            </form>

            <div className={style.createAccountHelper}>
                <span>Do not have an account?</span>
                <button onClick={() => dispatch(openRegisterForm())}>Registration</button>
            </div>

            <div className={style.socialButtons}>
                <form>
                    <button className={style.socialButton}>
                        <img className={style.socialIcon} src={google} alt="googleIcon" />
                        <span>Sign In with Google</span>
                    </button>
                </form>

                <form>
                    <button className={style.socialButton}>
                        <img className={style.socialIcon} src={facebook} alt="facebookIcon" />
                        <span>Sign In with Facebook</span>
                    </button>
                </form>

                <form>
                    <button className={style.socialButton}>
                        <img className={style.socialIcon} src={apple} alt="appleIcon" />
                        <span>Sign In with Apple</span>
                    </button>
                </form>
            </div>
        </div>
        // <div className={`${style.overlay} ${isOpenLoginForm ? style.open : ''}`} onClick={() => dispatch(closeForm())}>
        //     <div className={style.formCard} onClick={(e) => {e.stopPropagation()}}>
        //         <h2 className={style.title}>Login</h2>

        //         <button className={style.closeButton} onClick={() => dispatch(closeForm())}>
        //             <img src={close} alt="close" />
        //         </button>

        //         <form className={style.formContent}>
        //             <input
        //                 type="email"
        //                 placeholder="Email"
        //                 className={style.input}
        //             />

        //             <input
        //                 type="password"
        //                 placeholder="Password"
        //                 className={style.input}
        //             />

        //             <button className={style.loginButton}>Login</button>
        //         </form>

        //         <div className={style.createAccountHelper}>
        //             <span>Do not have an account?</span>
        //             <button onClick={() => setIsRegister((prev) => !prev)}>Registration</button>
        //         </div>

        //         <div className={style.socialButtons}>
        //             <form>
        //                 <button className={style.socialButton}>
        //                     <img className={style.socialIcon} src={google} alt="googleIcon" />
        //                     <span>Sign In with Google</span>
        //                 </button>
        //             </form>

        //             <form>
        //                 <button className={style.socialButton}>
        //                     <img className={style.socialIcon} src={facebook} alt="facebookIcon" />
        //                     <span>Sign In with Facebook</span>
        //                 </button>
        //             </form>

        //             <form>
        //                 <button className={style.socialButton}>
        //                     <img className={style.socialIcon} src={apple} alt="appleIcon" />
        //                     <span>Sign In with Apple</span>
        //                 </button>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    )
}
