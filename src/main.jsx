import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";

import Loading from "./components/helpers/Loading.jsx";
import { persistor, store } from "./store/configureStore";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={<Loading />} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
