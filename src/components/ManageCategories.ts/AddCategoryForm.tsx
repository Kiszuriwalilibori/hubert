import { useCallback, useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";

import { useAxios, useDispatchAction, useMessage } from "hooks";
import { BasicButton } from "components";
import { criterions, messages, validators } from "./utils";
import { Categories, Category } from "types";
import axios, { AxiosRequestConfig } from "axios";
import { URL_CATEGORIES } from "config";

const newCategoryInitialState = undefined as unknown as Object;
export const AddCategoryForm = () => {
    const [newCategory, setNewCategory] = useState(newCategoryInitialState);
    const showMessage = useMessage();
    const refForm = useRef<HTMLFormElement>(null);
    const { setCategories } = useDispatchAction();

    const onFormSubmit = () => {
        const data = Object.fromEntries(new FormData(refForm.current as HTMLFormElement) as any);
        const newCategory = {
            name: data.category,
            color: data.color,
        };

        setNewCategory(newCategory);
    };

    const { response, loading, error } = useAxios({
        method: "POST",
        url: "categories/create",
        data: newCategory,
        shouldWork: Boolean(newCategory),
    } as unknown as AxiosRequestConfig);

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
        if (response) {
            response && showMessage.success("Pomyślnie utworzono kategorię");
            reset();
            setNewCategory(newCategoryInitialState);

            axios
                .get(URL_CATEGORIES)
                .then(response => {
                    if (response.statusText === "OK" && response.data) {
                        const categories = [] as Categories;
                        (response.data as []).forEach((category: Category) => {
                            category = (({ id, name, color }) => ({ id, name, color }))(category);
                            categories.push(category);
                        });

                        setCategories(categories);
                    } else {
                        if (response.statusText !== "OK") {
                            showMessage.error("Podczas pobierania kategorii wystapił błąd");
                        } else {
                            showMessage.error("Brak kategorii do pobrania");
                        }
                    }
                })
                .catch(error => {
                    showMessage.error("error");
                });
        }
    }, [JSON.stringify(response)]);

    useEffect(() => {
        error && showMessage.error(`Podczas próby utworzenia kategorii wystąpił błąd ${error}`);
        reset();
        setNewCategory(newCategoryInitialState);
    }, [JSON.stringify(error)]);

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

            <BasicButton
                /*onClick={blur}*/ className="button--login"
                type="submit"
                aria-label="submit"
                children="Submit"
            />

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
