import { useSelector } from "react-redux";
import { selectSortedEvents } from "reduxware/selectors";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { Event } from "types";

import "react-vertical-timeline-component/style.min.css";
import EventCard from "./EventCard";
import { createColors, getStyles } from "./utils";

const Events = () => {
    const events = useSelector(selectSortedEvents);
    const colors = createColors(events);

    return (
        <VerticalTimeline layout={"1-column-left"} className="vertical-timeline-corrected">
            {events.map((event: Event) => {
                const styles = getStyles(colors, event);

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
    );
};

export default Events;
