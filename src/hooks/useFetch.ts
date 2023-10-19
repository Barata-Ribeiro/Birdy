import { useEffect, useRef, useState } from "react";

interface FetchState<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
}

const useFetch = <T>(
	url: RequestInfo | URL,
	options?: RequestInit | undefined
): FetchState<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const optionsRef = useRef(options);
	optionsRef.current = options;

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		const fetchData = async () => {
			setLoading(true);
			setData(null);

			try {
				const response = await fetch(url, {
					signal,
					...optionsRef.current,
				});
				if (!response.ok) throw new Error(`Error: ${response.status}`);
				const json = (await response.json()) as T;
				if (!signal.aborted) setData(json);
			} catch (err) {
				if (!signal.aborted && err instanceof Error) setError(err.message);
				console.error(err);
			} finally {
				if (!signal.aborted) setLoading(false);
			}
		};

		fetchData();

		return () => {
			controller.abort();
		};
	}, [url]);

	return { data, loading, error };
};

export default useFetch;
