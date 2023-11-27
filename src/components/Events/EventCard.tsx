import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback } from "react";
import moment from "moment";
import { Event, Events } from "types";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { useSelector } from "react-redux";
import { isAdminSelector } from "reduxware/reducers/adminReducer";
import { useAxios, useBoolean, useDispatchAction, useMessage } from "hooks";
import axios, { AxiosRequestConfig } from "axios";
import { sqlDateToEpoch } from "utilityFunctions";
import { URL_EVENTS } from "config";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));
interface Props {
    event: Event;
    color: string;
    categoryName: string | undefined;
}
export default function EventCard(props: Props) {
    const { name, imageURL, start_date, end_date, description, id } = props.event;
    const showMessage = useMessage();
    const { setEvents } = useDispatchAction();
    const { categoryName } = props;
    const [ID, setID] = React.useState<undefined | string>(undefined);
    const [expanded, setExpanded] = React.useState(false);
    const isAdmin = useSelector(isAdminSelector);
    const { setIsEditEventActive, setEditEventData } = useDispatchAction();

    const handleEdit = useCallback(() => {
        setIsEditEventActive(true);
        setEditEventData({ ...props.event });
    }, [setIsEditEventActive]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        console.log("id", ID);
    }, [ID]);

    const handleRemove = useCallback(() => {
        setID(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { response, loading, error } = useAxios({
        method: "DELETE",
        url: `events/${ID}`,
        data: ID,
    } as unknown as AxiosRequestConfig);

    React.useEffect(() => {
        if (response) {
            response && showMessage.success("Pomyślnie usunięto wydarzenie");

            setID(undefined);

            axios
                .get(URL_EVENTS)
                .then(response => {
                    if (response.statusText === "OK" && response.data) {
                        const events = [] as Events;
                        (response.data as []).forEach((event: any) => {
                            event = (({ id, name, categoryId, imageURL, description }) => ({
                                id,
                                name,
                                categoryId,
                                start_date: sqlDateToEpoch(event.startDate),
                                end_date: sqlDateToEpoch(event.endDate),
                                imageURL,
                                description,
                            }))(event);
                            events.push(event);
                        });

                        setEvents(events);
                    } else {
                        if (response.statusText !== "OK") {
                            showMessage.error("Podczas pobierania wydarzeń wystapił błąd");
                        } else {
                            showMessage.error("Brak wydarzeń do pobrania");
                        }
                    }
                })
                .catch(error => {
                    showMessage.error("error");
                });
        }
    }, [JSON.stringify(response)]);

    React.useEffect(() => {
        if (error) {
            showMessage.error(`Podczas próby usunięcia wydarzenia wystąpił błąd ${error}`);

            setID(undefined);
        }
    }, [JSON.stringify(error)]);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 214 }} image={imageURL} title={name} aria-label={name} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant="body2" component="div" sx={{ color: props.color }}>
                    {categoryName}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    {`${moment.unix(start_date / 1000).format("DD-MMM-YYYY")} - ${moment
                        .unix(end_date / 1000)
                        .format("DD-MMM-YYYY")}`}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                {isAdmin && (
                    <Button onClick={handleRemove} variant="contained" color="error" disabled={!isAdmin} size="small">
                        Remove
                    </Button>
                )}

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                {isAdmin && (
                    <Button onClick={handleEdit} variant="contained" color="warning" disabled={!isAdmin} size="small">
                        Edit
                    </Button>
                )}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
