import { RootStateType } from "components/AppProvider";

export interface Event {
    id: string;
    name: string;
    description: string;
    imageURL: string;
    categoryId: number;
    start_date: number;
    end_date: number;
}

export type SQL_Event = Omit<Event, "id" | "start_date" | "end_date"> & { start_date: string; end_date: string };
type Events = Event[];

interface Category {
    id: number;
    name: string;
    color: string;
}
type Categories = Category[];

type PathKeys = "events" | "landing" | "nopage";

export type { RootStateType, Events, Category, Categories, PathKeys };
