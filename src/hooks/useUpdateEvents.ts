import axios from "axios";

import useDispatchAction from "./useDispatchAction";
import useMessage from "./useMessage";

import { URL_EVENTS } from "config";
import { Events, Event } from "types";
import { sqlDateToEpoch } from "utilityFunctions";

export const useUpdateEvents = () => {
    const { setEvents } = useDispatchAction();
    const showMessage = useMessage();

    function updateEvents() {
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
                        showMessage.error("Podczas pobierania wydarzeń wystąpił błąd");
                    } else {
                        showMessage.error("Brak wydarzeń do pobrania");
                    }
                }
            })
            .catch(error => {
                showMessage.error(`Podczas pobierania wydarzeń wystąpił błąd ${error.message}`);
            });
    }

    return updateEvents;
};

export default useUpdateEvents;
