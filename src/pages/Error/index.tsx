import { ErrorResponse, Navigate, useRouteError } from "react-router-dom";

export default function Error({
	error,
}: {
	error?: ErrorResponse | undefined;
}) {
	let errorData = error as ErrorResponse | undefined;

	if (useRouteError()) errorData = useRouteError() as ErrorResponse;

	if (!errorData) {
		return <Navigate to="/" replace />;
	}

	if (errorData.status == 404) {
		return (
			<>
				<h1>404</h1>
				<p>Sorry, but the page you're looking for doesn't exist.</p>
			</>
		);
	}

	return (
		<>
			<h1>Error</h1>
			<p>
				Sorry, but an error occurred while loading. Please try refreshing the
				page or try again later...
			</p>
		</>
	);
}
