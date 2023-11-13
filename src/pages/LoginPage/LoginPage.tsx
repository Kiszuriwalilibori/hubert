import { useEffect } from "react";
import { useSelector } from "react-redux";

import { InvalidCredentialsMessage, LoginForm, LoginPrompt, Welcome } from "./components";
import { useMessage, useDispatchAction, useBoolean } from "hooks";

import { isOnlineSelector } from "reduxware/reducers/onlineReducer";

const Login = () => {
    const { logOutUser, setIsAdmin } = useDispatchAction();
    const isOnline = useSelector(isOnlineSelector);
    const showMessage = useMessage();
    const [isError, setError, clearError] = useBoolean(false);

    useEffect(() => {
        logOutUser();
        setIsAdmin(false);
    }, [logOutUser, setIsAdmin]);

    !isOnline && showMessage.warning("No internet connection - no login - no videos. Nothing at all.");

    return (
        <section className="page--login">
            <div className="login">
                <InvalidCredentialsMessage isError={isError} />
                <Welcome />
                {isOnline && <LoginPrompt />}
                {isOnline && <LoginForm setError={setError} clearError={clearError} />}
            </div>
        </section>
    );
};

export default Login;
