import moment from "moment";

export async function fetchData(URL: string) {
    const response = await fetch(URL);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}

export const sqlDateToEpoch = (date: string) => moment(date).valueOf();

export const formDateToSQL = (date: string) =>
    moment.unix(Number(new Date(date)) / 1000).format("YYYY-MM-DDTHH:mm:ss.mss[Z]");
