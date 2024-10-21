import { onAuthStateChanged, User } from "firebase/auth";
import { Suspense, useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { auth } from "../../services/firebase";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
	const [user, setUser] = useState<User>(auth.currentUser || null);
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, (data) => {
			if (data) {
				setUser(data);
				if (!data.emailVerified) navigate("../user/verifyEmail");
			} else {
				navigate("../login");
			}
		});
	}, []);

	return (
		<Suspense fallback={<Spinner size="md" />}>
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
			<Main>
				<h1>Dashboard</h1>
				<p>Welcome, {user.displayName}</p>
			</Main>
		</Suspense>
	);
}

const Main = styled.main`
	margin-top: 63px;
`;
