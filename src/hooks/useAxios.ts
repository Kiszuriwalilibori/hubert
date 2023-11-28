import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

axios.defaults.baseURL = "https://18.212.75.172:8080/api/";

export const useAxios = (axiosParams: AxiosRequestConfig) => {
    const { data } = axiosParams;
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState(undefined as unknown as AxiosError);
    const [loading, setLoading] = useState(true);

    const fetchData = async (params: AxiosRequestConfig) => {
        try {
            const result = await axios.request(params);
            setResponse(result.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error);
            } else {
                setError(error as AxiosError);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        data && fetchData(axiosParams);
    }, [JSON.stringify(data)]);

    return { response, error, loading };
};

export default useAxios;
