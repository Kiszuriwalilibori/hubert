import { RootStateType } from "components/AppProvider";

// export interface Event {
//     id: string;
//     name: string;
//     date: { start: number; end: number };
//     description: string;
//     image: string;
//     category: string;
// }

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

export type { CategoryColor, RootStateType, Events };
