import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
	ChakraProvider,
	ColorModeScript,
	SkipNavLink,
	Spinner,
} from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import theme from "./theme";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import Settings from "./pages/Settings";

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
		path: "/signup",
		element: <Signup />,
		errorElement: <Error />,
	},

	// user internal pages
	{
		path: "/user/dashboard",
		element: <Dashboard />,
		errorElement: <Error />,
	},
	{
		path: "/user/verifyEmail",
		element: <VerifyEmail />,
		errorElement: <Error />,
	},
	{
		path: "/user/settings",
		element: <Settings />,
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
