import Stack from "@mui/material/Stack";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AxiosRequestConfig } from "axios";

import { AddEvent, BasicButton, EditEvent, Events, ManageCategories } from "components";
import { useAxios, useBoolean, useDispatchAction, useMessage } from "hooks";
import { isAdminSelector } from "reduxware/reducers/adminReducer";
import { sqlDateToEpoch } from "utilityFunctions";
import { Category, Event } from "types";

function EventsPage() {
    const isAdmin = useSelector(isAdminSelector);
    const [isAddEventActive, showAddEventModal, hideAddEvent] = useBoolean(false);
    const [isManageCategoriesActive, showManageCategoriesModal, hideManageCategoriesModal] = useBoolean(false);
    const { setEvents, setCategories } = useDispatchAction();
    const showMessage = useMessage();

    const {
        response: responseCategories,
        loading: loadingCategories,
        error: errorCategories,
    } = useAxios({
        method: "GET",
        url: "categories",
        data: { foo: "categories" },
    } as unknown as AxiosRequestConfig);

    const {
        response: responseEvents,
        loading: loadingEvents,
        error: errorEvents,
    } = useAxios({
        method: "GET",
        url: "events",
        data: { foo: "events" },
    } as unknown as AxiosRequestConfig);

    useEffect(() => {
        responseCategories &&
            (responseCategories as []).forEach((category: Category) => {
                category = (({ id, name, color }) => ({ id, name, color }))(category);
            });

        responseCategories && setCategories(responseCategories);
    }, [responseCategories]);

    useEffect(() => {
        const localEvents = [] as Event[];
        responseEvents &&
            (responseEvents as []).forEach((event: any) => {
                console.log("raw event coming", event);
                const newEvent: Event = {
                    start_date: sqlDateToEpoch(event.startDate),
                    end_date: sqlDateToEpoch(event.endDate),
                    id: event.id,
                    categoryId: event.categoryId,
                    imageURL: event.imageURL,
                    description: event.description,
                    name: event.name,
                };

                localEvents.push(newEvent);
            });

        localEvents && setEvents(localEvents);
    }, [responseEvents]);

    errorEvents && showMessage.error("error fetching events " + errorEvents.message);
    errorCategories && showMessage.error("error fetching categories " + errorCategories.message);
    // (loadingEvents || loadingCategories) && console.log("loading");

    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    width: "100%",
                    zIndex: 100,
                    position: "fixed",
                    top: 0,
                    justifyContent: "center",
                    paddingTop: "16px",
                }}
            >
                {isAdmin && (
                    <BasicButton
                        disabled={!isAdmin}
                        className="button--login edit no-printable"
                        type="button"
                        aria-label="login"
                        onClick={showManageCategoriesModal}
                        children="Manage categories"
                    />
                )}
                {isAdmin && (
                    <BasicButton
                        disabled={!isAdmin}
                        className="button--login add no-printable"
                        aria-label="Add event"
                        onClick={showAddEventModal}
                        children="Add event"
                    />
                )}
            </Stack>
            <Events />
            <AddEvent isOpen={isAddEventActive} handleClose={hideAddEvent} />
            <EditEvent />
            <ManageCategories isOpen={isManageCategoriesActive} handleClose={hideManageCategoriesModal} />
        </>
    );
}

export default EventsPage;
