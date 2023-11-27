import moment from "moment";

export async function fetchData(URL: string) {
    const response = await fetch(URL);
    console.log("response", response);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        // console.log("error", response);
        throw new Error(message);
    }
    if (response.ok) {
        const data = await response.json();
        // console.log("data", data);
        return data;
    }
}

export const sqlDateToEpoch = (date: string) => moment(date).valueOf();
