import style from "./confirmEmail.module.scss";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { ConfirmEmailService } from "../../api/ConfirmEmail/confirmEmail";
import { useDispatch } from "react-redux";
import { closeRegisterForm } from "../../redux/LoginRegisterFormSlice/formSlice";

type ConfirmEmailProps = {
  email: string;
}

type ConfirmEmailFormData = {
  confirmCode: string;
}

export const ConfirmEmail = ({ email }: ConfirmEmailProps) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmEmailFormData>();

  const mutation = useMutation({
    mutationFn: (code: string) => ConfirmEmailService(email, code),
    onSuccess: () => {
      setTimeout(() => {
        dispatch(closeRegisterForm());
      }, 2000);
    }
  });

  const {isSuccess, isError} = mutation;

  const onSubmit = (data: ConfirmEmailFormData) => {
    mutation.mutate(data.confirmCode);
  };

  return (
    <div className={style.formCard}>
      <h2 className={style.title}>Підтвердіть email</h2>

      <button
        className={style.closeButton}
        onClick={() => dispatch(closeRegisterForm())}
      >
        <img src="/src/assets/icons/closeIcon.svg" alt="close" loading="lazy" />
      </button>

      <div className={style.description}>
        На вашу пошту <strong>{email}</strong> надійшов код. Введіть його
      </div>

      <form className={style.formContent} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
          <input
            autoComplete="off"
            type="text"
            placeholder="Код підтвердження"
            className={style.input}
            {...register("confirmCode", {
              required: "Будь ласка, введіть код підтвердження",
              minLength: {
                value: 6,
                message: "Код повинен містити мінімум 6 символів",
              },
              maxLength: {
                value: 6,
                message: "Код повинен містити максимум 6 символів",
              },
            })}
          />
          <p className={style.error}>{errors.confirmCode?.message}</p>
        </div>

        {isError && <p className={style.errorMessage}>
         Помилка підтвердження пошти
        </p>}
        {isSuccess && (
          <p className={style.successMessage}>Підтвердження пошти пройшло успішно!</p>
        )}

        <button
          type="submit"
          className={style.confirmButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <BeatLoader color="#ffffff" />
          ) : (
            "Підтвердити"
          )}
        </button>
      </form>
    </div>
  );
};