import { Suspense } from "react";
import Navbar from "../../components/Navbar";
import { Spinner } from "@chakra-ui/react";

export default function Settings() {
	return (
		<Suspense fallback={<Spinner size={"lg"} />}>
			<Navbar
				links={[
					{
						title: "Dashboard",
						url: "../user/dashboard",
					},
					{
						title: "Post",
						url: "../user/post",
					},
					{
						title: "API",
						url: "../api",
					},
				]}
			/>
			<h1>Settings</h1>
		</Suspense>
	);
}
