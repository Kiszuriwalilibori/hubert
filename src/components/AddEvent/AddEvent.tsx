import { useEffect } from "react";
import { useSelector } from "react-redux";

// import { InvalidCredentialsMessage, LoginForm, LoginPrompt } from ".";
import { useMessage, useDispatchAction, useBoolean } from "hooks";

import { isOnlineSelector } from "reduxware/reducers/onlineReducer";
import Modal from "@mui/material/Modal";
import AddEventPrompt from "./AddEventPrompt";
import AddEventForm from "./AddEventForm";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}
const Login = (props: Props) => {
    const { isOpen, handleClose } = props;

    const isOnline = useSelector(isOnlineSelector);
    const showMessage = useMessage();
    const [isError, setError, clearError] = useBoolean(false);

    return (
        <Modal sx={{ outline: 0 }} open={isOpen} onClose={handleClose}>
            <section className="login">
                {isOnline && <AddEventPrompt />}
                {isOnline && <AddEventForm handleClose={handleClose} setError={setError} clearError={clearError} />}
            </section>
        </Modal>
    );
};

export default Login;
