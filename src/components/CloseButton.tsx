import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    closeHandler: () => void;
}

export const CloseButton = (props: Props) => {
    const { closeHandler } = props;

    return (
        <IconButton
            aria-label="close"
            color="error"
            onClick={() => closeHandler()}
            sx={{ width: "40px", height: "40px" }}
        >
            <CloseIcon />
        </IconButton>
    );
};

export default CloseButton;
