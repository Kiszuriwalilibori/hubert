import { useEffect } from "react";
import useMessage from "./useMessage";
import useDispatchAction from "./useDispatchAction";

export const useHandleConnectionStatus = () => {
    const showMessage = useMessage();
    const { setIsOnline } = useDispatchAction();
    useEffect(() => {
        const handleStatusChange = () => {
            navigator.onLine && showMessage.success("Przywrócono połaczenie z internetem");
            navigator.onLine && setIsOnline(true);

            !navigator.onLine &&
                showMessage.error(
                    "Utraciłeś połączenie z internetem. Niektóre funkcjonalnosci mogą nie działać normalnie"
                );
            !navigator.onLine && setIsOnline(false);
        };
        window.addEventListener("online", handleStatusChange);
        window.addEventListener("offline", handleStatusChange);

        return () => {
            window.removeEventListener("offline", handleStatusChange);
            window.removeEventListener("online", handleStatusChange);
        };
    }, [showMessage, setIsOnline]);
};
export default useHandleConnectionStatus;
