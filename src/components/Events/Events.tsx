import uuid from "react-uuid";
import moment from "moment";

import "react-vertical-timeline-component/style.min.css";
import EventCard from "./EventCard";

import { getStyle } from "./utils";
import { selectSortedEvents } from "reduxware/selectors";
import { getCategoriesSelector } from "reduxware/reducers/categoriesReducer";
import { Event } from "types";
import { useSelector } from "react-redux";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";

const Events = () => {
    const events = useSelector(selectSortedEvents);
    const categories = useSelector(getCategoriesSelector);

    return (
        <>
            <header className="header">
                <h1 className="header__content">Time Axis</h1>
            </header>
            <VerticalTimeline layout={"1-column-left"} className="vertical-timeline-corrected no-printable">
                {events.map((event: Event) => {
                    const styles = getStyle(categories, event);
                    const category = categories.find(category => category.id === event.categoryId);
                    return (
                        <VerticalTimelineElement
                            key={uuid()}
                            contentStyle={{ background: "transparent" }}
                            contentArrowStyle={styles.arrow}
                            iconStyle={styles.icon}
                        >
                            <EventCard
                                event={event}
                                color={styles.icon.background as string}
                                categoryName={category?.name}
                            />
                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>

            <div className="events-printable">
                {events.map((event: Event) => {
                    return (
                        <div className="event-printable" key={uuid()}>
                            <h2>{event.name}</h2>
                            <p>Kategoria: {event.categoryId}</p>
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
