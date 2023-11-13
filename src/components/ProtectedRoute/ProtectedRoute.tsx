import { shallowEqual, useSelector } from "react-redux";
import { ReactNode } from "react";

import NotLogged from "./components/NotLogged";

import { getLoginStatus } from "reduxware/reducers/logReducer";

interface Props {
    children: JSX.Element;
}
export const ProtectedRoute = (props: Props) => {
    const isLogged = useSelector(getLoginStatus, shallowEqual);

    if (!isLogged) {
        return <NotLogged />;
    }

    return props.children;
};
export default ProtectedRoute;
