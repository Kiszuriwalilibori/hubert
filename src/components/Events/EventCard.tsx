import * as React from "react";
import moment from "moment";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

import { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { Event } from "types";

import { isAdminSelector } from "reduxware/reducers/adminReducer";
import { useAxios, useDispatchAction, useMessage, useUpdateEvents } from "hooks";
import { AxiosRequestConfig } from "axios";

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
    const updateEvents = useUpdateEvents();
    const { categoryName } = props;
    const [ID, setID] = React.useState<undefined | string>(undefined);
    const [expanded, setExpanded] = React.useState(false);
    const isAdmin = useSelector(isAdminSelector);
    const { setIsEditEventActive, setEditEventData } = useDispatchAction();

    const handleEdit = React.useCallback(() => {
        setIsEditEventActive(true);
        setEditEventData({ ...props.event });
    }, [setIsEditEventActive]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleRemove = React.useCallback(() => {
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
            updateEvents();
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
