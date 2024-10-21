import { useEffect, useRef, useState } from "react";
import {
	FormControl,
	FormLabel,
	Input,
	Spacer,
	Button,
	Alert,
	Spinner,
	AlertIcon,
	Stack,
} from "@chakra-ui/react";
import styled from "styled-components";
import {
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	setPersistence,
	updateProfile,
} from "firebase/auth";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import { auth } from "../../services/firebase";

export default function Signup() {
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const loadingContainer = useRef<HTMLDivElement | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		if (auth.currentUser) navigate("../user/dashboard");

		setTimeout(() => {
			(loadingContainer.current as HTMLDivElement | null)?.style.setProperty(
				"opacity",
				"0"
			);
			setIsLoading(false);

			setTimeout(() => {
				(loadingContainer.current as HTMLDivElement | null)?.remove();
			}, 300);
		}, 1000);
	}, []);

	return (
		<Main>
			<div
				className="loading"
				style={{
					position: "absolute",
					zIndex: "999",
					width: "100vw",
					height: "100vh",
					backgroundColor: "rgba(26, 32, 44, 1)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					opacity: `${isLoading ? "1" : "0"}`,
					transition: "all 0.3s ease",
				}}
				ref={loadingContainer}
			>
				<Spinner size="xl" />
			</div>
			<section className="container" style={{ position: "relative" }}>
				<Alert
					status="info"
					style={{ display: `${isSubmiting ? "flex" : "none"}` }}
				>
					<Spinner height={"20px"} width={"20px"} />
					<span style={{ width: "12px" }} />
					Logging on...
				</Alert>

				<Alert status="error" style={{ display: `${error ? "flex" : "none"}` }}>
					<AlertIcon />
					{auth.errorMessages[error] || "An error occurred."}
				</Alert>

				<Spacer
					height={5}
					style={{ display: `${isSubmiting || error ? "block" : "none"}` }}
				/>

				<form>
					<FormControl>
						<FormLabel>Display name</FormLabel>
						<Input
							type="text"
							name="displayName"
							placeholder="John Doe"
							value={displayName}
							isRequired
							autoComplete="name"
							onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
								setDisplayName(e.target.value);
							}}
						/>
					</FormControl>
					<Spacer height={10} />
					<FormControl>
						<FormLabel>Email address</FormLabel>
						<Input
							type="email"
							name="email"
							placeholder="user@example.com"
							value={email}
							isRequired
							autoComplete="username"
							onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
								setEmail(e.target.value);
							}}
						/>
					</FormControl>
					<Spacer height={10} />
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							name="password"
							placeholder="••••••••"
							value={password}
							isRequired
							autoComplete="current-password"
							onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
								setPassword(e.target.value);
							}}
						/>
					</FormControl>
					<Spacer height={10} />
					<FormControl>
						<Stack direction="row" spacing={4} align="center">
							<Button
								type="submit"
								colorScheme="teal"
								paddingX={7}
								isLoading={isSubmiting}
								onClick={async (e) => {
									e.preventDefault();
									setIsSubmiting(true);
									setError("");

									if (!displayName) {
										setError("auth/invalid-display-name");
										setIsSubmiting(false);
										return;
									}

									if (!email) {
										setError("auth/invalid-email");
										setIsSubmiting(false);
										return;
									}

									if (!password || password.length < 6) {
										setError("auth/invalid-password");
										setIsSubmiting(false);
										return;
									}

									await setPersistence(auth, browserSessionPersistence);
									createUserWithEmailAndPassword(auth, email, password)
										.then(() => {
											updateProfile(auth.currentUser, {
												displayName,
											});
											window.location.href = "../user/dashboard";
										})
										.catch((error) => {
											setError(error.code);
											setIsSubmiting(false);
											console.debug(error);
										});
								}}
							>
								Sign up
							</Button>
							<Button
								rightIcon={<ArrowForwardIcon />}
								colorScheme="teal"
								variant="outline"
								onClick={() => {
									navigate("../login");
								}}
							>
								Login
							</Button>
						</Stack>
					</FormControl>
				</form>
			</section>
		</Main>
	);
}

const Main = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;

	section.container {
		width: 100%;
		max-width: 750px;
		margin: 0 25px;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 6px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
`;
