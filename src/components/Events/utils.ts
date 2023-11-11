import { Events, Event, CategoryColor } from "types";

export function createColors(evs: Events) {
    const ary = evs.map((item: Event) => {
        return item.category;
    });
    const set = Array.from(new Set(ary));

    const result: CategoryColor[] = [];
    set.forEach(item => {
        const obj = {} as CategoryColor;
        obj.category = item;
        obj.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        result.push(obj);
    });
    return result;
}

export function getStyles(colors: CategoryColor[], event: Event) {
    const bgr = colors.find(color => color.category === event.category);

    const icon = {
        background: bgr?.color,
        color: "#fff",
    };

    const arrow = {
        borderRight: "7px solid" + bgr?.color,
    };

    return { icon: icon, arrow: arrow };
}
