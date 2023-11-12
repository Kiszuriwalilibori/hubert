import { AddEvent, BasicButton, EditEvent, Events, Login, ManageCategories } from "components";
import { useBoolean, useHandleConnectionStatus } from "hooks";
import { isAdminSelector } from "reduxware/reducers/adminReducer";
import "./App.css";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

function App() {
    useHandleConnectionStatus();
    const isAdmin = useSelector(isAdminSelector);
    const [isLoginActive, showModal, hideModal] = useBoolean(false);
    const [isAddEventActive, showAddEventModal, hideAddEvent] = useBoolean(false);
    const [isManageCategoriesActive, showManageCategoriesModal, hideManageCategoriesModal] = useBoolean(false);
    return (
        <div className="App">
            <header className="footer"></header>
            <main>
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
                    <BasicButton
                        className="button--login"
                        type="button"
                        aria-label="login"
                        onClick={showModal}
                        children="Log in as admin"
                    />
                    <BasicButton
                        disabled={!isAdmin}
                        className="button--login edit"
                        type="button"
                        aria-label="login"
                        onClick={showManageCategoriesModal}
                        children="Manage categories"
                    />
                    <BasicButton
                        disabled={!isAdmin}
                        className="button--login add"
                        aria-label="Add event"
                        onClick={showAddEventModal}
                        children="Add event"
                    />
                </Stack>
                <Events />
                <Login isOpen={isLoginActive} handleClose={hideModal} />
                <AddEvent isOpen={isAddEventActive} handleClose={hideAddEvent} />
                <EditEvent />
                <ManageCategories isOpen={isManageCategoriesActive} handleClose={hideManageCategoriesModal} />
            </main>
            <footer className="footer"></footer>
        </div>
    );
}

export default App;
