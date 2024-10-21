import { Button, Spinner, Stack, useToast } from "@chakra-ui/react";
import styled from "styled-components";
import { MdEmail, MdLogout, MdMarkEmailUnread } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { sendEmailVerification, type User } from "firebase/auth";

import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
	const [user, setUser] = useState<User>(auth.currentUser!);

	const loadingContainer = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();

	const toast = useToast({
		position: "top",
	});

	useEffect(() => {
		auth.onAuthStateChanged((data: User) => {
			if (data) {
				setUser(data);
				if (data.emailVerified) navigate("../user/dashboard");

				loadingContainer.current?.style.setProperty("opacity", "0");
				setTimeout(() => {
					loadingContainer.current?.remove();
				}, 500);
			} else {
				navigate("../login");
			}
		});
	}, []);

	return (
		<Main>
			<div
				className="loading-container"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "absolute",
					width: "100vw",
					height: "100vh",
					backgroundColor: "rgba(26, 32, 44, 1)",
					zIndex: 100,
					opacity: 1,
					transition: "opacity 0.5s ease",
				}}
				ref={loadingContainer}
			>
				<Spinner size={"lg"} />
			</div>
			<section
				className="container"
				style={{
					position: "relative",
				}}
			>
				<h1>
					<MdMarkEmailUnread
						fontSize={125}
						style={{ marginBottom: "1.5rem" }}
					/>
					Verify your email{`, ${user?.displayName}` || ""}!
				</h1>
				<p>
					We have sent you an email with a link to verify your account. Please
					click on the link to verify your account.
				</p>
				<Stack spacing={4} className="buttonsRow">
					<Button
						colorScheme="teal"
						leftIcon={<MdEmail />}
						size={"lg"}
						onClick={() => {
							const verifyEmailPromise = new Promise<void>(
								(resolve, reject) => {
									if (auth.currentUser.emailVerified) {
										toast({
											title: "Error!",
											description: "Your email is already verified.",
											status: "error",
											duration: 5000,
											isClosable: true,
											onCloseComplete: () => {
												navigate("../user/dashboard");
											},
										});

										return reject();
									}

									console.info("Sending email verification...");

									sendEmailVerification(auth.currentUser)
										.then(() => {
											setTimeout(() => {
												console.info("Email sent successfully.");
												resolve();
											}, 1000);
										})
										.catch((response) => {
											setTimeout(() => {
												console.error(
													"An error occurred while sending the email."
												);
												console.debug(response);
												reject();
											}, 1000);
										});
								}
							);

							toast.promise(verifyEmailPromise, {
								success: {
									title: "Success!",
									description: "Email sent successfully.",
								},
								error: {
									title: "Error!",
									description:
										"An error occurred while sending the email. Try again later.",
								},
								loading: {
									title: "Loading...",
									description: "Please wait while we send you the email.",
								},
							});
						}}
					>
						Resend email
					</Button>
					<Button
						colorScheme="red"
						type="button"
						variant="outline"
						leftIcon={<MdLogout />}
						size={"lg"}
						onClick={() => {
							auth.signOut().then(() => {
								navigate("../");
							});
						}}
					>
						Logout
					</Button>
				</Stack>
			</section>
		</Main>
	);
}

const Main = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;

	& .buttonsRow {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}

	& section.container {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	& section.container p {
		font-size: 1.2rem;
	}

	& section.container h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
		font-weight: 600;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	& section.container button {
		margin-top: 2.5rem;
	}

	@media (max-width: 1200px) {
		& section.container {
			padding: 0 1rem;
		}
	}

	@media (max-width: 700px) {
		& section.container {
			padding: 0 1.5rem;
		}
	}

	@media (max-width: 500px) {
		& .buttonsRow {
			display: flex;
			flex-direction: column;
			width: 90%;

			& button {
				margin-top: 15px !important;
				width: 100%;
			}

			& button:first-child {
				margin-top: 50px !important;
			}
		}
	}
`;
