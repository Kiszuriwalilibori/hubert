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

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

export function convertEpochToSpecificTimezone(timeEpoch: string | number | Date, offset: number) {
    var d = new Date(timeEpoch);
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * offset);
    return nd.toLocaleString("en-US", options as any);
}

export function convertEpochToPolish(timeEpoch: string | number | Date, offset: number) {
    var d = new Date(timeEpoch);
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * offset);
    return nd.toLocaleString("pl-PL", options as any);
}
