import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import "./index.css";
import App from "./routes/app/App.tsx";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <App />,
			errorElement: <ErrorPage />,
		},
	],
	{ basename: "/mockdata" } /* za ec2 deploy */
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
