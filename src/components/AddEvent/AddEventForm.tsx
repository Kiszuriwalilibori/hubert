import { useCallback, useRef } from "react";

import { useForm } from "react-hook-form";

import { useDispatchAction } from "hooks";
import { BasicButton } from "components";
import { criterions, messages, validators } from "./utils";
import { Event } from "types";

interface Props {
    setError: () => void;
    clearError: () => void;
    handleClose: () => void;
}

export const AddEventForm = (props: Props) => {
    const { setError, clearError, handleClose } = props;

    const refForm = useRef<HTMLFormElement>(null);
    const blur = (e: React.MouseEvent<HTMLElement>) => e.currentTarget && e.currentTarget.blur();

    const onFormSubmit = () => {
        const data = Object.fromEntries(new FormData(refForm.current as HTMLFormElement) as any);

        const newEvent: Event = {
            category: data.category,
            name: data.name,
            description: data.description,
            image: data.image,
            id: (Math.random() + 1).toString(36).substring(2),
            date: { start: Number(new Date(data.start_date)), end: Number(new Date(data.end_date)) },
        };
        console.log(newEvent);
        handleClose();

        // todo w tym miejscu należy wyslać dane
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm();

    const handleReset = useCallback(() => {
        clearErrors();
        clearError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

            <label className="field">
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

export default AddEventForm;
