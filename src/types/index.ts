export interface Event {
    id: string;
    name: string;
    date: { start: string; end: string };
    description: string;
    category: string;
}
export type Events = Event[];
