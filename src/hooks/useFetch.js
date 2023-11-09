import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A custom hook for making HTTP requests.
 *
 * @param {string} url - The URL to make the request to
 * @param {object} options - The options for the request, including any headers, body, etc.
 * @returns {object} An object containing the response and parsed JSON, or an error if one occurred
 */
const useFetch = (url, options) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const abortControllerRef = useRef(null);

	const request = useCallback(async (url, options) => {
		let response;
		let json;

		const abortController = new AbortController();
		abortControllerRef.current = abortController;
		const { signal } = abortController;

		try {
			setError(null);
			setLoading(true);

			response = await fetch(url, { ...options, signal });
			const tempJson = await response.json();
			if (!response.ok) {
				if ("message" in tempJson)
					throw new Error(tempJson.message || "Network response was not ok...");
				else
					throw new Error(
						"Network response was not ok and the error message is unknown."
					);
			}

			json = tempJson;
		} catch (err) {
			if (err instanceof Error) {
				if (err.name !== "AbortError") {
					json = null;
					setError(err.message);
				}
			} else String(err);
		} finally {
			if (!signal.aborted) {
				setData(json);
				setLoading(false);
			}
		}
		return { response, json };
	}, []);

	useEffect(() => {
		return () => {
			abortControllerRef.current?.abort();
		};
	}, []);

	return { data, error, loading, request };
};

export default useFetch;
