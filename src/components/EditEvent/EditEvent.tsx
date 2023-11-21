import Modal from "@mui/material/Modal";
import { useCallback } from "react";
import { useSelector } from "react-redux";

import EditEventForm from "./EditEventForm";

import { useMessage, useDispatchAction, useBoolean } from "hooks";
import { isOnlineSelector } from "reduxware/reducers/onlineReducer";
import { editEventDataSelector, isEditEventActiveSelector } from "reduxware/reducers/editEventReducer";
import { CloseButton } from "components";

const EditEvent = () => {
    const { setIsEditEventActive } = useDispatchAction();
    const handleClose = useCallback(() => {
        setIsEditEventActive(false);
    }, [setIsEditEventActive]);

    const isOpen = useSelector(isEditEventActiveSelector);
    const initialData = useSelector(editEventDataSelector);

    const isOnline = useSelector(isOnlineSelector);
    const showMessage = useMessage();
    const [isError, setError, clearError] = useBoolean(false);

    return (
        <Modal sx={{ outline: 0 }} open={isOpen} onClose={handleClose}>
            <section className="login">
                <CloseButton closeHandler={handleClose} />
                <h2 className="login__prompt">Please edit event data</h2>
                {isOnline && (
                    <EditEventForm
                        handleClose={handleClose}
                        setError={setError}
                        clearError={clearError}
                        initialData={initialData}
                    />
                )}
            </section>
        </Modal>
    );
};

export default EditEvent;
