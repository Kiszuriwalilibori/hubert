import loadable from "@loadable/component";

import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Paths from "routing";
import ProtectedRoute from "components/ProtectedRoute";

import { LoginPage } from "pages/index";
import { useHandleConnectionStatus } from "hooks";

import "./App.css";

const EventsPage = loadable(() => import("pages/EventsPage"));
const NoPage = loadable(() => import("pages/NoPage"));

function App() {
    useHandleConnectionStatus();

    return (
        <div className="App">
            <main>
                <Routes>
                    <Route path={Paths.landing} element={<LoginPage />} />
                    <Route
                        path={Paths.events}
                        element={
                            <ProtectedRoute>
                                <EventsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path={Paths.nopage} element={<NoPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
