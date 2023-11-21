import { useSelector } from "react-redux";
import { selectSortedEvents } from "reduxware/selectors";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import moment from "moment";
import { Event } from "types";

import "react-vertical-timeline-component/style.min.css";
import EventCard from "./EventCard";
import { createColors, getStyles } from "./utils";
import uuid from "react-uuid";
import { getCategoriesSelector } from "reduxware/reducers/categoriesReducer";

const Events = () => {
    const events = useSelector(selectSortedEvents);
    const categories = useSelector(getCategoriesSelector);
    const colors = createColors(events);
    console.log("colors", colors);
    console.log("categories", categories);

    return (
        <>
            <header className="header">
                <h1 className="header__content">Time Axis</h1>
            </header>
            <VerticalTimeline layout={"1-column-left"} className="vertical-timeline-corrected no-printable">
                {events.map((event: Event) => {
                    const styles = getStyles(colors, event);
                    console.log(styles);
                    return (
                        <VerticalTimelineElement
                            key={event.start_date}
                            contentStyle={{ background: "transparent" }}
                            contentArrowStyle={styles.arrow}
                            iconStyle={styles.icon}
                        >
                            <EventCard event={event} color={styles.icon.background as string} />
                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>

            <div className="events-printable">
                {events.map((event: Event) => {
                    return (
                        <div className="event-printable" key={uuid()}>
                            <h2>{event.name}</h2>
                            <p>Kategoria: {event.category}</p>
                            <p>Start: {moment.unix(event.start_date).format("DD-MMM-YYYY")}</p>
                            <p>End: {moment.unix(event.start_date).format("DD-MMM-YYYY")}</p>
                            <p>{event.description}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Events;
