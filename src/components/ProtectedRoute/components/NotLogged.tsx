import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paths from "routing";

const NotLogged = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate(Paths.landing);
        }, 5000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <article className="not-logged">Nie jesteś zalogowany! &#128542; </article>;
};

export default NotLogged;
