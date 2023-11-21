import { useCallback, useEffect, useRef } from "react";

import { useForm } from "react-hook-form";

import { useDispatchAction } from "hooks";
import { BasicButton } from "components";
import { criterions, messages, validators } from "./utils";
import { Category } from "types";

interface Props {
    category: Category;
}

export const EditCategoryForm = (props: Props) => {
    const { category } = props;
    const refForm = useRef<HTMLFormElement>(null);
    const blur = (e: React.MouseEvent<HTMLElement>) => e.currentTarget && e.currentTarget.blur();
    const { setCategories } = useDispatchAction();

    const onFormSubmit = () => {
        const data = Object.fromEntries(new FormData(refForm.current as HTMLFormElement) as any);
        const newCategory = {
            Name: data.category,
            Color: data.color,
            Id: category.Id,
        };
        console.log("category after edit", newCategory);
        // todo w tym miejscu należy wyslać kategorie na serwer i zaktualizować lokalnie
        //
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm();

    const handleReset = useCallback(() => {
        clearErrors();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let defaultValues = {} as any;
        defaultValues.category = category.Name;
        defaultValues.color = category.Color;
        reset({ ...defaultValues });
    }, [category]);

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

            <label className="field field--300">
                <p className="field__label">color</p>
                <input
                    className="field__input"
                    autoComplete="color"
                    autoCorrect="off"
                    autoFocus
                    type="text"
                    tabIndex={0}
                    placeholder="Type category color  HEX here..."
                    {...register("color", validators.color)}
                />
                {errors.color && errors.color.type === "required" && (
                    <span className="field__hint">
                        {messages.required}
                        {criterions.color.required}
                    </span>
                )}
                {errors.color && errors.color.type === "pattern" && (
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

export default EditCategoryForm;
