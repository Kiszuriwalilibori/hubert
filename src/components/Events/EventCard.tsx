import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Event } from "types";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { useSelector } from "react-redux";
import { isAdminSelector } from "reduxware/reducers/adminReducer";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

function convertEpochToSpecificTimezone(timeEpoch: string | number | Date, offset: number) {
    var d = new Date(timeEpoch);
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * offset);
    return nd.toLocaleString("en-US", options as any);
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

export default function EventCard({ name, image, date, description, category, id }: Event) {
    const [expanded, setExpanded] = React.useState(false);
    const isAdmin = useSelector(isAdminSelector);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 140 }} image={image} title={name} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    {`${convertEpochToSpecificTimezone(date.start, 0)} - ${convertEpochToSpecificTimezone(
                        date.end,
                        0
                    )}`}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" color="error" disabled={!isAdmin} size="small">
                    Remove
                </Button>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                <Button variant="contained" color="warning" disabled={!isAdmin} size="small">
                    Edit
                </Button>
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
