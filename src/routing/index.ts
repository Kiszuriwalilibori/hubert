import { PathKeys } from "types";

const Paths: { [key in PathKeys]: string } = {
    events: "/events",
    landing: "/",
    nopage: "*",
};

export default Paths;
