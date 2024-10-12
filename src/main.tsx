import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import {
	createBrowserRouter,
	RouterProvider,
	useRouteError,
} from "react-router-dom";

import Error from "./pages/Error/Error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Home</div>,
		errorElement: <Error />,
	},
	{
		path: "/login",
		element: <div>login</div>,
	},
	{
		path: "/dashboard",
		element: <div>dashboard</div>,
	},
]);

if (!document.getElementById("app"))
	document.body.appendChild(document.createElement("div")).id = "app";

createRoot(document.getElementById("app")!).render(
	<StrictMode>
		<ChakraProvider>
			<Suspense fallback={<Spinner />}>
				<RouterProvider router={router} />
			</Suspense>
		</ChakraProvider>
	</StrictMode>
);
