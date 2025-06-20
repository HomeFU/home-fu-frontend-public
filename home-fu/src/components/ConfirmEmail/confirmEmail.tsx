import style from "./confirmEmail.module.scss";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { ConfirmEmailApi } from "../../api/ConfirmEmail/confirmEmail";
import { useDispatch } from "react-redux";
import { closeRegisterForm } from "../../redux/LoginRegisterFormSlice/formSlice";

type ConfirmEmailProps = {
  email: string;
  onEmailConfirmed?: () => void;
}

type ConfirmEmailFormData = {
  confirmCode: string;
}

export const ConfirmEmail = ({ email, onEmailConfirmed }: ConfirmEmailProps) => {
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmEmailFormData>();

  const mutation = useMutation({
    mutationFn: (confirmCode: string) => ConfirmEmailApi(email, confirmCode),
    onSuccess: () => {
      setTimeout(() => {
        if (onEmailConfirmed) {
          onEmailConfirmed();
        } else {
          dispatch(closeRegisterForm());
        }
      }, 2000);
    }
  });

  const {isError, isSuccess} = mutation;

  const onSubmit = (data: ConfirmEmailFormData) => {
    mutation.mutate(data.confirmCode);
  };

  return (
    <div className={style.formCard}>
      <h2 className={style.title}>Підтвердіть email</h2>

      <button
        className={style.closeButton}
        onClick={() => {
          if (onEmailConfirmed) {
            onEmailConfirmed();
          } else {
            dispatch(closeRegisterForm());
          }
        }}
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

        {isError && <p className={style.errorMessage}>Ошибка подтверждения email</p>}
        {isSuccess && (
          <p className={style.successMessage}>Email успешно подтвержден!</p>
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