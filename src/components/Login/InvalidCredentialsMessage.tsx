import { memo } from "react";
import Fade from "@mui/material/Fade";

interface Props {
    isError: boolean;
}
const text = "- - - Błędne dane logowania - - -";
export const InvalidCredentialsMessage = (props: Props) => {
    const { isError } = props;
    return (
        <Fade in={isError}>
            <p className="login__invalid-credentials">{text}</p>
        </Fade>
    );
};
export default memo(InvalidCredentialsMessage);
