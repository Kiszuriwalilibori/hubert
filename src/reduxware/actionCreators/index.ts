import { createAction } from "@reduxjs/toolkit";

export const setIsAdmin = createAction<boolean>("IS_ONLINE_SET");
export const setEvents = createAction<Events>("EVENTS_SET");
