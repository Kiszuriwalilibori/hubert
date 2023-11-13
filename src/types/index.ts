import { RootStateType } from "components/AppProvider";

export interface Event {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    start_date: number;
    end_date: number;
}
type Events = Event[];

interface CategoryColor {
    category: string;
    color: string;
}

interface Category {
    id: number;
    name: string;
}
type Categories = Category[];

type PathKeys = "events" | "landing" | "nopage";

export type { CategoryColor, RootStateType, Events, Category, Categories, PathKeys };
