import { Button, ButtonGroup, SkipNavContent, Text } from "@chakra-ui/react";
import { ReactTyped } from "react-typed";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

export default function Home() {
	let wallpapers = [
		`${window.location.protocol}//${window.location.hostname}:${window.location.port}/wallpapers/1.jpg`,
		`${window.location.protocol}//${window.location.hostname}:${window.location.port}/wallpapers/2.jpg`,
		`${window.location.protocol}//${window.location.hostname}:${window.location.port}/wallpapers/3.jpg`,
		`${window.location.protocol}//${window.location.hostname}:${window.location.port}/wallpapers/4.jpg`,
		`${window.location.protocol}//${window.location.hostname}:${window.location.port}/wallpapers/5.jpg`,
		`${window.location.protocol}//${window.location.hostname}:${window.location.port}/wallpapers/6.jpg`,
		`${window.location.protocol}//${window.location.hostname}:${window.location.port}/wallpapers/7.jpg`,
		`${window.location.protocol}//${window.location.hostname}:${window.location.port}/wallpapers/8.jpg`,
		`${window.location.protocol}//${window.location.hostname}:${window.location.port}/wallpapers/9.jpg`,
		`${window.location.protocol}//${window.location.hostname}:${window.location.port}/wallpapers/10.jpg`,
	];

	const navigate = useNavigate();

	return (
		<>
			<SkipNavContent />

			<Navbar
				links={[
					{
						title: "Home",
						url: "./",
					},
					{
						title: "About",
						url: "./about",
					},
					{
						title: "Pricing",
						url: "./pricing",
					},
					{
						title: "API",
						url: "./api",
					},
				]}
			/>

			<main>
				<section
					className="hero_content"
					style={{
						marginTop: "63px",
						width: "100vw",
						height: "calc(100vh - 63px)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						paddingBottom: "63px",
					}}
				>
					<div
						className="hero_text"
						style={{
							position: "relative",
							zIndex: "2",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text
							fontSize="50px"
							style={{
								textAlign: "center",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<p style={{ maxWidth: "75vw" }}>
								<span style={{ fontWeight: "bold" }}>wallpaper.net</span> is
								much more than a wallpaper site. It's where you'll{" "}
								<ReactTyped
									strings={[
										"find your daily inspiration",
										"get lost in the beauty",
										"discover your next favorite background",
										"fuel your creativity",
										"transform your device",
										"elevate your screen aesthetics",
										"start your visual adventure",
										"enrich your digital canvas",
										"explore the endless possibilities",
									]}
									typeSpeed={40}
									backSpeed={25}
									loop
									style={{ fontWeight: "bold", textDecoration: "underline" }}
								/>
								.
							</p>
						</Text>
						<ButtonGroup className="hero__cta" style={{ marginTop: "25px" }}>
							<Button
								size="lg"
								variant="outline"
								colorScheme="teal"
								onClick={() => {
									navigate("../login");
								}}
							>
								Login
							</Button>
							<Button
								size="lg"
								variant="solid"
								colorScheme="teal"
								onClick={() => {
									navigate("../signup");
								}}
							>
								Sign Up
							</Button>
						</ButtonGroup>
					</div>

					<Slider className="carousel">
						<div className="container-fluid px-0">
							<div className="row">
								<div className="col-12">
									<div className="carousel__wrapper">
										{wallpapers.map((wallpaper, index) => {
											return (
												<div className="carousel__slide" key={index}>
													<div
														className="carousel__image"
														style={{
															backgroundImage: "url('" + wallpaper + "')",
														}}
													></div>
												</div>
											);
										})}
										{wallpapers.map((wallpaper, index) => {
											return (
												<div className="carousel__slide" key={index}>
													<div
														className="carousel__image"
														style={{
															backgroundImage: "url('" + wallpaper + "')",
														}}
													></div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</Slider>
				</section>
			</main>
		</>
	);
}

const Slider = styled.section`
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(421.88px * 10 * -1));
		}
	}

	.carousel__wrapper {
		display: flex;
		/*justify-content: center;*/
		align-items: center;

		width: 100%;
		overflow: hidden;
		margin: 0 auto;
	}

	.carousel__wrapper::before,
	.carousel__wrapper::after {
		content: "";
		height: 750px;
		width: 150px;
		position: absolute;
		z-index: 99;
	}

	.carousel__wrapper::before {
		background: linear-gradient(to right, #1a202c, transparent);
	}

	.carousel__wrapper::after {
		background: linear-gradient(to left, #1a202c, transparent);
		right: 0;
	}

	overflow: hidden;
	position: absolute;
	width: 100vw;
	z-index: -1;
	opacity: 0.3;

	.carousel__slide {
		animation: scroll 30s linear infinite;
		display: flex;
		flex-direction: column;

		flex: 0 0 auto;
		width: 421.88px;
		height: 750px;
		box-sizing: border-box;
	}

	.carousel__image {
		background-size: cover;
		background-repeat: no-repeat;

		height: 750px;
		/*width: 100px;*/
		margin: 15px 20px;
		border-radius: 25px;
	}

	/* just for analysis remove this 3 rules later*/
	.carousel__slide {
		position: relative;
	}

	.carousel__slide::before {
		position: absolute;
		top: 0%;
		left: 50%;
		font-size: 2rem;
		color: lime;
	}
`;
