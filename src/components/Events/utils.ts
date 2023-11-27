import { Event, Categories } from "types";

export function getStyle(categories: Categories, event: Event) {
    const category = categories.find(category => category.id === event.categoryId);

    const icon = {
        background: category ? category.color : "black",
        color: "#fff",
    };

    const arrow = {
        borderRight: "7px solid " + (category ? category.color : "black"),
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
