import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import paths from "routing";

import { useDispatchAction, useMessage } from "hooks";
import { BasicButton } from "components";
import { criterions, messages, validators } from "./utils";

interface Props {
    setError: () => void;
    clearError: () => void;
}

export const LogInForm = (props: Props) => {
    const { setError, clearError } = props;
    const { logUser, setIsAdmin } = useDispatchAction();
    const showMessage = useMessage();
    const refPassword = useRef<HTMLInputElement | null>(null);
    const refEmail = useRef<HTMLInputElement | null>(null);
    const history = useNavigate();

    const onFormSubmit = useCallback(() => {
        const password = refPassword.current!.value;

        if (password === process.env.REACT_APP_PASSWORD || password === process.env.REACT_APP_USER_PASSWORD) {
            logUser();
            history(paths.events);
            showMessage.success("You have successfully logged");
            if (password != process.env.REACT_APP_PASSWORD) {
                showMessage.info("Your status is USER");
            }
        } else {
            setError();
        }
        if (password === process.env.REACT_APP_PASSWORD) {
            setIsAdmin(true);
            history(paths.events);
            showMessage.info("Your status is ADMIN");
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm();

    const { ref, ...rest } = register("password", validators.password);

    const handleReset = useCallback(() => {
        clearErrors();
        clearError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form className="login__form" onSubmit={handleSubmit(onFormSubmit)}>
            <label className="field">
                <p className="field__label">email</p>
                <input
                    className="field__input"
                    autoComplete="email"
                    autoCorrect="off"
                    autoFocus
                    type="text"
                    tabIndex={0}
                    placeholder="Type your e-mail here..."
                    {...register("email", validators.email)}
                />
                {errors.email && errors.email.type === "required" && (
                    <span className="field__hint">
                        {messages.required}
                        {criterions.email.required}
                    </span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                    <span className="field__hint">{messages.pattern}</span>
                )}
            </label>

            <label className="field">
                <p className="field__label">password</p>
                <input
                    className="field__input"
                    autoComplete="current-password"
                    tabIndex={0}
                    ref={e => {
                        ref(e);
                        refPassword.current = e;
                    }}
                    placeholder="Type your password here..."
                    type="password"
                    {...rest}
                />
                {errors.password && errors.password.type === "required" && (
                    <span className="field__hint">
                        {messages.required}
                        {criterions.password.required}
                    </span>
                )}
            </label>

            <BasicButton className="button--login" type="submit" aria-label="submit" children="Submit" />

            <BasicButton
                className="button--login"
                type="reset"
                aria-label="reset"
                onClick={handleReset}
                children="Wyczyść"
            />
        </form>
    );
};

export default LogInForm;
