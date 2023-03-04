import { useState, useCallback } from 'react';
import axios from 'axios';

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (
            url,
            method = 'GET',
            body = null,
            headers = { 'Content-Type': 'application/json' }
        ) => {
            setLoading(true);

            try {
                const response = await axios({
                    method: method.toLowerCase(),
                    url: encodeURI(url),
                    responseType: 'json',
                    headers: headers,
                    data: body,
                });
                let responseOK =
                    response &&
                    response.status === 200;
                if (!responseOK) {
                    throw new Error(
                        `Could not fetch ${url}, status ${response.status}`
                    );
                }

                const data = await response.data;
                setLoading(false);
                return data;
            } catch (e) {
                setLoading(false);
                setError(e.message);
                throw e;
            }
        },
        []
    );

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return [loading, request, error, clearError];
};

export default useHttp;
