/**
 * React hook for making HTTP requests.
 *
 * @returns {{
 *  data: any,
 *  error: Error,
 *  loading: boolean,
 *  request: (url: string, options?: RequestInit) => Promise<{ response: Response, json: any }>
 * }}
 */
const useFetch = () => {
	const [data, setData] = React.useState(null);
	const [error, setError] = React.useState(null);
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
						"Network response was not ok and error message is unknown"
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
