import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate(-1);
        }, 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="page--none">
            <h1 className="invisible"> No Page</h1>
            <p>Ojejku! Strony o adresie "{decodeURIComponent(window.location.href)}" po prostu nie ma &#128549;</p>;
        </div>
    );
};

export default NoPage;
