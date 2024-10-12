import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, Spinner } from "@chakra-ui/react";

if (!document.getElementById("app"))
	document.body.appendChild(document.createElement("div")).id = "app";

createRoot(document.getElementById("app")!).render(
	<StrictMode>
		<ChakraProvider>
			<Suspense fallback={<Spinner />}></Suspense>
		</ChakraProvider>
	</StrictMode>
);
