import { useCallback, useEffect, useRef, useState } from "react";

interface FetchResult<T> {
	response: Response | null;
	json: T | null;
}

type ErrorResponse = {
	message: string;
};

const useFetch = <T>() => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	const request = useCallback(
		async (url: string, options?: RequestInit): Promise<FetchResult<T>> => {
			let response: Response | null = null;
			let json: T | null = null;

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
						throw new Error(
							tempJson.message || "Network response was not ok..."
						);
					else
						throw new Error(
							"Network response was not ok and error message is unknown"
						);
				}

				json = tempJson as T;
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
		},
		[]
	);

	useEffect(() => {
		return () => {
			abortControllerRef.current?.abort();
		};
	}, []);

	return { data, error, loading, request };
};

export default useFetch;
