import { BasicButton, Events, Login } from "components";
import { useBoolean, useHandleConnectionStatus } from "hooks";
import "./App.css";
import Stack from "@mui/material/Stack";

function App() {
    useHandleConnectionStatus();

    const [isLoginActive, showModal, hideModal, toggleModal] = useBoolean(false);

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
                        className="button--login"
                        type="button"
                        aria-label="login"
                        onClick={() => {
                            console.log("edit category");
                        }}
                        children="Edit categories"
                    />
                </Stack>
                <Login isOpen={isLoginActive} handleClose={hideModal} />
                <Events />
            </main>
            <footer className="footer"></footer>
        </div>
    );
}

export default App;
