import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMessage, useDispatchAction, useBoolean } from "hooks";
import { isOnlineSelector } from "reduxware/reducers/onlineReducer";
import Modal from "@mui/material/Modal";
import AddEventPrompt from "./EditEventPrompt";
import EditEventForm from "./EditEventForm";
import { editEventDataSelector, isEditEventActiveSelector } from "reduxware/reducers/editEventReducer";

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
                {isOnline && <AddEventPrompt />}
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
