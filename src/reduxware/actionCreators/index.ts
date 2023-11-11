import { createAction } from "@reduxjs/toolkit";
import { Events } from "types/index";

export const setIsAdmin = createAction<boolean>("IS_ADMIN_SET");
export const setEvents = createAction<Events>("EVENTS_SET");
export const setIsOnline = createAction<boolean>("IS_ONLINE_SET");
