import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, SkipNavLink, Spinner } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <Error />,
	},
	{
		path: "/login",
		element: <Login />,
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
			<SkipNavLink>Skip to content</SkipNavLink>
			<Suspense fallback={<Spinner />}>
				<RouterProvider router={router} />
			</Suspense>
		</ChakraProvider>
	</StrictMode>
);
