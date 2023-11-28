import Modal from "@mui/material/Modal";
import { useCallback } from "react";
import { useSelector } from "react-redux";

import EditEventForm from "./EditEventForm";

import { useDispatchAction } from "hooks";
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

    return (
        <Modal sx={{ outline: 0 }} open={isOpen} onClose={handleClose}>
            <section className="login">
                <CloseButton closeHandler={handleClose} />
                <h2 className="login__prompt">Edytuj wydarzenie</h2>
                {isOnline && <EditEventForm handleClose={handleClose} initialData={initialData} />}
            </section>
        </Modal>
    );
};

export default EditEvent;
