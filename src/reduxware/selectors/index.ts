import { createSelector } from "@reduxjs/toolkit";
import { getAllEvents } from "reduxware/reducers/eventReducer";
import { Events, Event } from "types/index";

function compareEvents(a: Event, b: Event) {
    if (a.date.start < b.date.start) {
        return 1;
    }
    if (a.date.start > b.date.start) {
        return -1;
    }
    return 0;
}

const sortEvents = (arr: Events) => {
    if (arr.length) {
        const arry = [...arr];
        let result = arry.sort(compareEvents);
        return result;
    } else return arr;
};

export const selectSortedEvents = createSelector(getAllEvents, sortEvents);
