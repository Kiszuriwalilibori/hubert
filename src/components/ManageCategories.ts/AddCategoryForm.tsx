import { useCallback, useRef } from "react";

import { useForm } from "react-hook-form";

import { useDispatchAction } from "hooks";
import { BasicButton } from "components";
import { criterions, messages, validators } from "./utils";
import { Event } from "types";

export const AddCategoryForm = () => {
    const refForm = useRef<HTMLFormElement>(null);
    const blur = (e: React.MouseEvent<HTMLElement>) => e.currentTarget && e.currentTarget.blur();

    const onFormSubmit = () => {
        const data = Object.fromEntries(new FormData(refForm.current as HTMLFormElement) as any);

        const newCategory = {
            category: data.category,
        };

        // todo w tym miejscu należy wyslać nową kategorię na serwer, pobrać zaktualizowane kategorie, zintegrować z eventami i zaktualizować jedno i drugie
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm();

    const handleReset = useCallback(() => {
        clearErrors();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form className="login__form" onSubmit={handleSubmit(onFormSubmit)} ref={refForm}>
            <label className="field field--300">
                <p className="field__label">name</p>
                <input
                    className="field__input"
                    autoComplete="category"
                    autoCorrect="off"
                    autoFocus
                    type="text"
                    tabIndex={0}
                    placeholder="Type category name here..."
                    {...register("category", validators.category)}
                />
                {errors.category && errors.category.type === "required" && (
                    <span className="field__hint">
                        {messages.required}
                        {criterions.category.required}
                    </span>
                )}
                {errors.category && errors.category.type === "pattern" && (
                    <span className="field__hint">{messages.pattern}</span>
                )}
            </label>

            <BasicButton onClick={blur} className="button--login" type="submit" aria-label="submit" children="Submit" />

            <BasicButton
                className="button--login"
                type="reset"
                aria-label="reset"
                onClick={handleReset}
                children="Reset"
            />
        </form>
    );
};

export default AddCategoryForm;
