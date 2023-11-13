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
import { Event } from "types";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { useSelector } from "react-redux";
import { isAdminSelector } from "reduxware/reducers/adminReducer";
import { useDispatchAction } from "hooks";

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
}
export default function EventCard(props: Props) {
    const { name, image, start_date, end_date, description, category, id } = props.event;

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

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 214 }} image={image} title={name} aria-label={name} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant="body2" component="div" sx={{ color: props.color }}>
                    {category}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    {`${moment.unix(start_date).format("DD-MMM-YYYY")} - ${moment
                        .unix(end_date)
                        .format("DD-MMM-YYYY")}`}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                {isAdmin && (
                    <Button variant="contained" color="error" disabled={!isAdmin} size="small">
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
