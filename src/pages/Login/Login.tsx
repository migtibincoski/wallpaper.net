import { useEffect, useState } from "react";
import {
	FormControl,
	FormLabel,
	Input,
	Spacer,
	Button,
	Alert,
	Spinner,
	AlertIcon,
	Collapse,
	useDisclosure,
} from "@chakra-ui/react";
import styled from "styled-components";
import {
	browserSessionPersistence,
	setPersistence,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../services/firebase";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		console.log(auth.currentUser);
		if (auth.currentUser) window.location.href = "./dashboard";
	}, []);

	return (
		<Main>
			<section className="container">
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
						<FormLabel>Email address</FormLabel>
						<Input
							type="email"
							name="email"
							placeholder="user@example.com"
							value={email}
							isRequired
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
							onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
								setPassword(e.target.value);
							}}
						/>
					</FormControl>
					<Spacer height={10} />
					<FormControl>
						<Button
							type="submit"
							colorScheme="teal"
							paddingX={7}
							isLoading={isSubmiting}
							onClick={async (e) => {
								e.preventDefault();
								setIsSubmiting(true);
								setError("");

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
								signInWithEmailAndPassword(auth, email, password)
									.then(() => {
										return (window.location.href = "./dashboard");
									})
									.catch(({ code }) => {
										setError(code);
										setIsSubmiting(false);
									});
							}}
						>
							Login
						</Button>
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
