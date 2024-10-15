import {
	Avatar,
	CloseIcon,
	HamburgerIcon,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { BsPersonFillAdd, BsBoxArrowInRight } from "react-icons/bs";

import { auth } from "../../services/firebase";

type linkObject = {
	title: string;
	url: string;
	id: string;
	liProps?: object;
	aProps?: object;
};

export default function Navbar({
	title,
	links,
}: {
	title: string | undefined;
	links: linkObject[];
}) {
	const [isNavbarOpened, setIsNavbarOpened] = useState(false);

	return (
		<Nav className={`nav ${isNavbarOpened ? "openNav" : ""}`}>
			<HamburgerIcon
				className="navOpenBtn"
				onClick={() => {
					setIsNavbarOpened(true);
				}}
			/>
			<a href="#" className="logo">
				{title || "wallpaper.net"}
			</a>
			<ul className="nav-links">
				<CloseIcon
					className="navCloseBtn"
					onClick={() => {
						setIsNavbarOpened(false);
					}}
				/>
				{links.map((link) => {
					return (
						<li {...link.liProps} key={link.id}>
							<Link to={link.url} {...link.aProps}>
								{link.title}
							</Link>
						</li>
					);
				})}
			</ul>

			<Menu id="avatar">
				<MenuButton
					as={Button}
					rounded={"full"}
					variant={"link"}
					cursor={"pointer"}
					minW={0}
				>
					<Avatar
						size={"sm"}
						name={auth.currentUser?.displayName || auth.currentUser?.email}
						src={auth.currentUser?.photoURL}
						id="avatarImage"
					/>
				</MenuButton>
				<MenuList style={{ maxWidth: "150px" }}>
					<MenuItem>
						<BsBoxArrowInRight style={{ marginRight: "10px" }} /> Login
					</MenuItem>
					<MenuItem>
						<BsPersonFillAdd style={{ marginRight: "10px" }} /> Sign Up
					</MenuItem>
				</MenuList>
			</Menu>
		</Nav>
	);
}

const Nav = styled.nav`
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	width: 100%;
	padding: 15px 200px;
	background: #1a202c;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: space-between;

	#avatar {
		width: 150.55px;
	}

	& .nav-links {
		display: flex;
		align-items: center;
	}

	& a {
		color: #fff;
		text-decoration: none;
	}
	& .logo {
		font-size: 22px;
		font-weight: 500;
	}
	& .nav-links {
		column-gap: 20px;
		list-style: none;
	}
	& .nav-links a {
		transition: all 0.2s linear;
	}

	& #avatar {
		position: absolute;
		right: 250px;
		height: 45px;
		max-width: 555px;
		width: 100%;
		opacity: 0;
		pointer-events: none;
		transition: all 0.2s linear;
	}
	& #avatar #avatarImage {
		position: absolute;
		left: 15px;
		top: 50%;
		left: 15px;
		color: #4a98f7;
		transform: translateY(-50%);
	}
	& .navOpenBtn,
	& .navCloseBtn {
		display: none;
	}
	/* responsive */
	@media screen and (max-width: 1160px) {
		padding: 15px 100px;
	}
	@media screen and (max-width: 950px) {
		padding: 15px 50px;
	}
	@media screen and (max-width: 768px) {
		& .navOpenBtn,
		& .navCloseBtn {
			display: block;
		}

		padding: 15px 20px;

		& .nav-links {
			position: fixed;
			top: 0;
			left: -100%;
			height: 100%;
			width: 100%;
			padding-top: 100px;
			row-gap: 30px;
			flex-direction: column;
			background-color: #1a202c;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			transition: all 0.4s ease;
			z-index: 100;

			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;

			font-size: 25px;
		}
		&.openNav .nav-links {
			left: 0;
		}
		& .navOpenBtn {
			color: #fff;
			font-size: 20px;
			cursor: pointer;
		}
		& .navCloseBtn {
			position: absolute;
			top: 20px;
			right: 20px;
			color: #fff;
			font-size: 20px;
			cursor: pointer;
		}
	}
`;
