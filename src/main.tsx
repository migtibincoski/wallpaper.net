import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

if (!document.getElementById("app"))
	document.body.appendChild(document.createElement("div")).id = "app";

createRoot(document.getElementById("app")!).render(<StrictMode></StrictMode>);
