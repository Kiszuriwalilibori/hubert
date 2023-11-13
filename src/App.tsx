import loadable from "@loadable/component";

import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Paths from "routing";
import ProtectedRoute from "components/ProtectedRoute";

import { LoginPage } from "pages/index";
import { useHandleConnectionStatus } from "hooks";

import "./App.css";

const YouTubePage = loadable(() => import("pages/YouTubePage"));
const NoPage = loadable(() => import("pages/NoPage"));

function App() {
    useHandleConnectionStatus();

    return (
        <div className="App">
            <main>
                <Routes>
                    <Route path={Paths.landing} element={<LoginPage />} />
                    <Route
                        path={Paths.youtube}
                        element={
                            <ProtectedRoute>
                                <YouTubePage />
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
