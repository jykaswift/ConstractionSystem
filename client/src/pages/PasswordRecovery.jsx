import React, { useState } from "react";
import styles from "../styles/modules/passwordRecovery.module.scss";
import { useForm } from "react-hook-form";
import AuthService from "../services/AuthService";

const PasswordRecovery = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const [isSubmited, setSubmited] = useState(false);


  const onSubmit = async (data) => {
    AuthService.recover(data)
    setSubmited(true)
  };

  return (
    <div className="content">
      <div className="container">
        <div className={styles.box}>
          <h1>Восстановление пароля</h1>

          {!isSubmited ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <p>Пожалуйста введите свою почту</p>
              <input
                type="text"
                placeholder={"Введите email"}
                className={styles.TextField}
                {...register("email", {
                  required: "Email не может быть пустым",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Некорректный адрес почты",
                  },
                })}
              />
              {errors.email && (
                <p className={styles.warning}>{errors.email?.message}</p>
              )}

              <button type="submit" className={styles.button}>
                Восстановить
              </button>
            </form>
          ) : (
            <p>
              На вашу почту отправлено письмо. <p></p> <p>Для восстановления пароля
              следуйте инструкциям указанным в этом письме</p>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
