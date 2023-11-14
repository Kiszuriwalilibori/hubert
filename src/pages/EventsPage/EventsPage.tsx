import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

import { AddEvent, BasicButton, EditEvent, Events, ManageCategories } from "components";
import { useBoolean, useDispatchAction } from "hooks";
import { isAdminSelector } from "reduxware/reducers/adminReducer";
import { useEffect } from "react";

function EventsPage() {
    const isAdmin = useSelector(isAdminSelector);
    const [isAddEventActive, showAddEventModal, hideAddEvent] = useBoolean(false);
    const [isManageCategoriesActive, showManageCategoriesModal, hideManageCategoriesModal] = useBoolean(false);
    const { setEvents, setCategories } = useDispatchAction();

    useEffect(() => {
        //todo tu ma być skrypt pobierający dane tj. eventy i kategorie
        // przy sukcesie zintegrować kategorie z danymi i wykonać setEvents i setCategories z tymi danymi
    }, []);
    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    width: "100%",
                    zIndex: 100,
                    position: "fixed",
                    top: 0,
                    justifyContent: "center",
                    paddingTop: "16px",
                }}
            >
                {isAdmin && (
                    <BasicButton
                        disabled={!isAdmin}
                        className="button--login edit no-printable"
                        type="button"
                        aria-label="login"
                        onClick={showManageCategoriesModal}
                        children="Manage categories"
                    />
                )}
                {isAdmin && (
                    <BasicButton
                        disabled={!isAdmin}
                        className="button--login add no-printable"
                        aria-label="Add event"
                        onClick={showAddEventModal}
                        children="Add event"
                    />
                )}
            </Stack>
            <Events />
            <AddEvent isOpen={isAddEventActive} handleClose={hideAddEvent} />
            <EditEvent />
            <ManageCategories isOpen={isManageCategoriesActive} handleClose={hideManageCategoriesModal} />
        </>
    );
}

export default EventsPage;
