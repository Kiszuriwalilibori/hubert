import { useCallback, useState } from "react";

function useBoolean(initialValue: boolean = false) {
    const [value, setValue] = useState(initialValue);

    function setTrue() {
        setValue(true);
    }

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    const toggle = useCallback(() => {
        setValue(!value);
    }, [value]);

    return [value, setTrue, setFalse, toggle] as const;
}

export default useBoolean;
