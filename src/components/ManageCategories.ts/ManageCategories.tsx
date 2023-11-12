import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMessage, useDispatchAction, useBoolean } from "hooks";
import { isOnlineSelector } from "reduxware/reducers/onlineReducer";
import Modal from "@mui/material/Modal";
import ManageCategoriesPrompt from "./ManageCategoriesPrompt";
import EditEventForm from "./EditEventForm";
import { editEventDataSelector, isEditEventActiveSelector } from "reduxware/reducers/editEventReducer";
import AddCategoryForm from "./AddCategoryForm";
import Tabs from "./Tabs";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

const ManageCategories = (props: Props) => {
    const { isOpen, handleClose } = props; // todo jakiś guzik do zamknięcia całosi musi to konsumować handleclose

    const isOnline = useSelector(isOnlineSelector);
    const showMessage = useMessage();
    // const [isError, setError, clearError] = useBoolean(false);

    return (
        <Modal sx={{ outline: 0 }} open={isOpen} onClose={handleClose}>
            <section className="login login--large">
                {isOnline && <ManageCategoriesPrompt />}
                <Tabs />

                {/* {isOnline && <AddCategoryForm handleClose={handleClose} setError={setError} clearError={clearError} />} */}
            </section>
        </Modal>
    );
};

export default ManageCategories;
