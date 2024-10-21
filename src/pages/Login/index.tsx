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
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Text,
	useDisclosure,
	ButtonGroup,
} from "@chakra-ui/react";
import styled from "styled-components";
import {
	browserSessionPersistence,
	setPersistence,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { MdKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { auth } from "../../services/firebase";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(
		null
	);
	const [isSendingForgotPasswordEmail, setIsSendingForgotPasswordEmail] =
		useState(false);
	const loadingContainer = useRef<HTMLDivElement | null>(null);

	const navigate = useNavigate();
	const forgotPasswordModalHook = useDisclosure();

	useEffect(() => {
		if (auth.currentUser) window.location.href = "./user/dashboard";

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
											window.location.href = "./user/dashboard";
										})
										.catch((error) => {
											setError(error.code);
											setIsSubmiting(false);
											console.debug(error);
										});
								}}
							>
								Login
							</Button>
							<Button
								rightIcon={<ArrowForwardIcon />}
								colorScheme="teal"
								variant="outline"
								onClick={() => {
									navigate("../signup");
								}}
							>
								Sign up
							</Button>
						</Stack>
						<Button
							rightIcon={<MdKey />}
							colorScheme="teal"
							variant="outline"
							onClick={forgotPasswordModalHook.onOpen}
							marginTop={15}
						>
							Recover password
						</Button>
					</FormControl>
				</form>
			</section>

			<Modal
				onClose={forgotPasswordModalHook.onClose}
				isOpen={forgotPasswordModalHook.isOpen}
				isCentered
				size={"xl"}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Recover your password</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>
							Enter below the email address you used to create your account on
							our platform. We will send you an email with a link to reset your
							password.
						</Text>

						<Spacer height={5} />

						<Alert status="info" variant="left-accent">
							<AlertIcon />
							If you don't find the email in your inbox, try checking your spam
							folder!
						</Alert>

						<Spacer height={5} />

						{forgotPasswordError != null && (
							<>
								<Alert status="error">
									<AlertIcon />
									{auth.errorMessages[forgotPasswordError] ||
										`There was an error processing your request: (${forgotPasswordError})`}
								</Alert>

								<Spacer height={5} />
							</>
						)}

						<FormControl>
							<FormLabel>Email address</FormLabel>
							<Input type="email" />
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<ButtonGroup>
							<Button colorScheme={"teal"} leftIcon={<MdKey />}>
								Send recovery email
							</Button>
							<Button
								colorScheme={"teal"}
								variant={"outline"}
								onClick={forgotPasswordModalHook.onClose}
							>
								Cancel
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
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
