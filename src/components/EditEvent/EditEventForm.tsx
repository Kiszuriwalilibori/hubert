import { useCallback, useEffect, useRef } from "react";

import { useForm } from "react-hook-form";

import { useDispatchAction } from "hooks";
import { BasicButton } from "components";
import { criterions, messages, validators } from "./utils";
import { Event } from "types";
import moment from "moment";
import { useSelector } from "react-redux";
import { getCategoriesSelector } from "reduxware/reducers/categoriesReducer";
import uuid from "react-uuid";

interface Props {
    setError: () => void;
    clearError: () => void;
    handleClose: () => void;
    initialData: Event;
}

export const EditEventForm = (props: Props) => {
    const { setError, clearError, handleClose, initialData } = props;
    const categories = useSelector(getCategoriesSelector);

    const refForm = useRef<HTMLFormElement>(null);
    const blur = (e: React.MouseEvent<HTMLElement>) => e.currentTarget && e.currentTarget.blur();

    const onFormSubmit = () => {
        const data = Object.fromEntries(new FormData(refForm.current as HTMLFormElement) as any);

        const newEvent: Event = {
            category: data.category,
            name: data.name,
            description: data.description,
            image: data.image,
            id: initialData.id,
            start_date: Number(new Date(data.start_date)) / 1000,
            end_date: Number(new Date(data.end_date)) / 1000,
        };

        handleClose();

        // todo w tym miejscu należy wyslać dane
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        clearErrors,
    } = useForm();

    const handleReset = useCallback(() => {
        clearErrors();
        clearError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let defaultValues = { ...initialData } as any;

        defaultValues.start_date = moment.unix(initialData.start_date).format("DD-MM-YYYY");
        defaultValues.end_date = moment.unix(initialData.end_date).format("DD-MM-YYYY");

        reset({ ...defaultValues });
    }, []);

    return (
        <form className="login__form" onSubmit={handleSubmit(onFormSubmit)} ref={refForm}>
            <label className="field">
                <p className="field__label">name</p>
                <input
                    className="field__input"
                    autoComplete="name"
                    autoCorrect="off"
                    autoFocus
                    type="text"
                    tabIndex={0}
                    placeholder="Type event name here..."
                    {...register("name", validators.name)}
                />
                {errors.name && errors.name.type === "required" && (
                    <span className="field__hint">
                        {messages.required}
                        {criterions.name.required}
                    </span>
                )}
                {errors.name && errors.name.type === "pattern" && (
                    <span className="field__hint">{messages.pattern}</span>
                )}
            </label>
            {/* category comes here */}

            {/* <label className="field">
                <p className="field__label">category</p>
                <input
                    className="field__input"
                    autoComplete="category"
                    autoCorrect="off"
                    type="text"
                    tabIndex={0}
                    placeholder="Type category here..."
                    {...register("category", validators.category)}
                />
                {errors.name && errors.name.type === "required" && (
                    <span className="field__hint">
                        {messages.required}
                        {criterions.name.required}
                    </span>
                )}
                {errors.name && errors.name.type === "pattern" && (
                    <span className="field__hint">{messages.pattern}</span>
                )}
            </label> */}

            <label className="field">
                <p className="field__label">category</p>
                <select
                    className="field__input"
                    autoComplete="category"
                    autoCorrect="off"
                    tabIndex={0}
                    defaultValue={initialData.category}
                    placeholder="Type category here..."
                    {...register("category", validators.category)}
                >
                    {categories.map(category => {
                        return (
                            <option key={uuid()} value={category.name}>
                                {category.name}
                            </option>
                        );
                    })}
                </select>
                {errors.name && errors.name.type === "required" && (
                    <span className="field__hint">
                        {messages.required}
                        {criterions.name.required}
                    </span>
                )}
            </label>

            {/* image comes here */}
            <label className="field">
                <p className="field__label">image</p>
                <input
                    className="field__input"
                    autoComplete="image"
                    autoCorrect="off"
                    type="text"
                    tabIndex={0}
                    placeholder="Type image URL here..."
                    {...register("image", validators.image)}
                />
                {errors.image && errors.image.type === "required" && (
                    <span className="field__hint">
                        {messages.required}
                        {criterions.image.required}
                    </span>
                )}
                {errors.image && errors.image.type === "pattern" && (
                    <span className="field__hint">{messages.pattern}</span>
                )}
            </label>
            {/* description comes here*/}
            <label className="field--textarea">
                <p className="field__label">description</p>
                <textarea
                    rows={4}
                    cols={25}
                    autoComplete="name"
                    autoCorrect="off"
                    tabIndex={0}
                    placeholder="Type description here..."
                    {...register("description", validators.description)}
                />
                {errors.description && errors.description.type === "required" && (
                    <span className="field__hint">
                        {messages.required}
                        {criterions.description.required}
                    </span>
                )}
                {errors.description && errors.description.type === "pattern" && (
                    <span className="field__hint">{messages.pattern}</span>
                )}
            </label>

            {/* start date comes here*/}
            <label className="field">
                <p className="field__label">start date</p>
                <input
                    className="field__input"
                    autoComplete="start_date"
                    autoCorrect="off"
                    type="date"
                    tabIndex={0}
                    {...register("start_date", validators.start_date)}
                />
                {errors.start_date && errors.start_date.type === "required" && (
                    <span className="field__hint">{messages.required}</span>
                )}
            </label>
            {/* end date comes here*/}
            <label className="field">
                <p className="field__label">end date</p>
                <input
                    className="field__input"
                    autoComplete="end_date"
                    autoCorrect="off"
                    type="date"
                    tabIndex={0}
                    {...register("end_date", validators.end_date)}
                />
                {errors.end_date && errors.end_date.type === "required" && (
                    <span className="field__hint">{messages.required}</span>
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

export default EditEventForm;
