import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
	ChakraProvider,
	ColorModeScript,
	SkipNavLink,
	Spinner,
} from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

import theme from "./theme";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <Error />,
	},
	{
		path: "/login",
		element: <Login />,
		errorElement: <Error />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		errorElement: <Error />,
	},
]);

if (!document.getElementById("app"))
	document.body.appendChild(document.createElement("div")).id = "app";

createRoot(document.getElementById("app")!).render(
	<StrictMode>
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<SkipNavLink>Skip to content</SkipNavLink>
			<Suspense fallback={<Spinner />}>
				<RouterProvider router={router} />
			</Suspense>
		</ChakraProvider>
	</StrictMode>
);
