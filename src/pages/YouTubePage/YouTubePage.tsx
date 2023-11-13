import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

import { AddEvent, BasicButton, EditEvent, Events, ManageCategories } from "components";
import { useBoolean } from "hooks";
import { isAdminSelector } from "reduxware/reducers/adminReducer";

function YouTubePage() {
    const isAdmin = useSelector(isAdminSelector);
    const [isAddEventActive, showAddEventModal, hideAddEvent] = useBoolean(false);
    const [isManageCategoriesActive, showManageCategoriesModal, hideManageCategoriesModal] = useBoolean(false);

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
                        className="button--login edit"
                        type="button"
                        aria-label="login"
                        onClick={showManageCategoriesModal}
                        children="Manage categories"
                    />
                )}
                {isAdmin && (
                    <BasicButton
                        disabled={!isAdmin}
                        className="button--login add"
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

export default YouTubePage;
