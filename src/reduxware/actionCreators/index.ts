import { createAction } from "@reduxjs/toolkit";
import { Events, Event, Categories } from "types/index";

export const setIsAdmin = createAction<boolean>("IS_ADMIN_SET");
export const setEvents = createAction<Events>("EVENTS_SET");
export const setIsOnline = createAction<boolean>("IS_ONLINE_SET");
export const setIsEditEventActive = createAction<boolean>("IS_EDIT_EVENT_ACTIVE");
export const setEditEventData = createAction<Event>("EDIT_EVENT_DATA_SET");
export const setCategories = createAction<Categories>("CATEGORIES_SET");
export const logUser = createAction("USER_LOGIN");
export const logOutUser = createAction("USER_LOGOUT");
