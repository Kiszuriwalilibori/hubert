import { useCallback, useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";

import { BasicButton } from "components";
import { criterions, messages, validators } from "./utils";
import { Events } from "types";
import { useSelector } from "react-redux";
import { getCategoriesSelector } from "reduxware/reducers/categoriesReducer";
import uuid from "react-uuid";
import moment from "moment";
import useAxios from "hooks/useAxios";
import axios, { AxiosRequestConfig } from "axios";
import useMessage from "hooks/useMessage";
import { URL_EVENTS } from "config";
import useDispatchAction from "hooks/useDispatchAction";

import { sqlDateToEpoch } from "utilityFunctions";

interface Props {
    setError: () => void;
    clearError: () => void;
    handleClose: () => void;
}
const newEventInitialState = undefined as unknown as Object;
export const AddEventForm = (props: Props) => {
    const [newEvent, setNewEvent] = useState(newEventInitialState);
    const { setError, clearError, handleClose } = props;
    const categories = useSelector(getCategoriesSelector);
    const { setEvents } = useDispatchAction();
    const refForm = useRef<HTMLFormElement>(null);
    const blur = (e: React.MouseEvent<HTMLElement>) => e.currentTarget && e.currentTarget.blur();
    const showMessage = useMessage();
    const onFormSubmit = () => {
        const data = Object.fromEntries(new FormData(refForm.current as HTMLFormElement) as any);

        const newEvent: any = {
            categoryId: +data.category,
            name: data.name,
            description: data.description,
            imageURL: data.image,
            startDate: moment.unix(Number(new Date(data.start_date)) / 1000).format("YYYY-MM-DDTHH:mm:ss.mss[Z]"),
            endDate: moment.unix(Number(new Date(data.end_date)) / 1000).format("YYYY-MM-DDTHH:mm:ss.mss[Z]"),
        };

        setNewEvent(newEvent);
    };

    const { response, loading, error } = useAxios({
        method: "POST",
        url: "events/create",
        data: newEvent,
    } as unknown as AxiosRequestConfig);

    useEffect(() => {
        if (response) {
            response && showMessage.success("Pomyślnie utworzono wydarzenie");
            reset();
            setNewEvent(newEventInitialState);
            handleClose();

            axios
                .get(URL_EVENTS)
                .then(response => {
                    if (response.statusText === "OK" && response.data) {
                        const events = [] as Events;
                        (response.data as []).forEach((event: any) => {
                            event = (({ id, name, categoryId, imageURL, description }) => ({
                                id,
                                name,
                                categoryId,
                                start_date: sqlDateToEpoch(event.startDate),
                                end_date: sqlDateToEpoch(event.endDate),
                                imageURL,
                                description,
                            }))(event);
                            events.push(event);
                        });

                        setEvents(events);
                    } else {
                        if (response.statusText !== "OK") {
                            showMessage.error("Podczas pobierania wydarzeń wystapił błąd");
                        } else {
                            showMessage.error("Brak wydarzeń do pobrania");
                        }
                    }
                })
                .catch(error => {
                    showMessage.error("error");
                });
        }
    }, [JSON.stringify(response)]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm();

    const handleReset = useCallback(() => {
        clearErrors();
        clearError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (error) {
            showMessage.error(`Podczas próby utworzenia wydarzenia wystąpił błąd ${error}`);
            reset();
            setNewEvent(newEventInitialState);
            handleClose();
        }
    }, [JSON.stringify(error)]);
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

            <label className="field">
                <p className="field__label">category</p>
                <select
                    className="field__input"
                    autoComplete="category"
                    autoCorrect="off"
                    tabIndex={0}
                    placeholder="Type category here..."
                    {...register("category", validators.category)}
                >
                    {categories.map(category => {
                        return (
                            <option key={uuid()} value={category.id}>
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

export default AddEventForm;
