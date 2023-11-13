import Modal from "@mui/material/Modal";

import { useSelector } from "react-redux";
import { useMessage, useDispatchAction, useBoolean } from "hooks";
import { isOnlineSelector } from "reduxware/reducers/onlineReducer";

import AddEventForm from "./AddEventForm";
import CloseButton from "components/CloseButton";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}
const AddEvent = (props: Props) => {
    const { isOpen, handleClose } = props;

    const isOnline = useSelector(isOnlineSelector);
    const showMessage = useMessage();
    const [isError, setError, clearError] = useBoolean(false);

    return (
        <Modal sx={{ outline: 0 }} open={isOpen} onClose={handleClose}>
            <section className="login">
                <CloseButton closeHandler={handleClose} />
                <h2 className="login__prompt">Please enter event data</h2>
                {isOnline && <AddEventForm handleClose={handleClose} setError={setError} clearError={clearError} />}
            </section>
        </Modal>
    );
};

export default AddEvent;
