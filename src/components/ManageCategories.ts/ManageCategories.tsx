import Modal from "@mui/material/Modal";

import { useSelector } from "react-redux";
import { isOnlineSelector } from "reduxware/reducers/onlineReducer";
import { CloseButton } from "components";

import Tabs from "./Tabs";
interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

const ManageCategories = (props: Props) => {
    const { isOpen, handleClose } = props;
    const isOnline = useSelector(isOnlineSelector);

    return (
        <Modal sx={{ outline: 0 }} open={isOpen} onClose={handleClose}>
            <section className="login login--large">
                <CloseButton closeHandler={handleClose} />
                <h2 className="login__prompt">Edytuj lub usuń kategorię</h2>
                {isOnline && <Tabs />}
            </section>
        </Modal>
    );
};

export default ManageCategories;
