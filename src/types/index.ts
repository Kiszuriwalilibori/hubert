import { RootStateType } from "components/AppProvider";

export interface Event {
    id: string;
    name: string;
    description: string;
    image: string;
    category: number;
    start_date: number;
    end_date: number;
}
type Events = Event[];

interface Category {
    Id: number;
    Name: string;
    Color: string;
}
type Categories = Category[];

type PathKeys = "events" | "landing" | "nopage";

export type { RootStateType, Events, Category, Categories, PathKeys };
