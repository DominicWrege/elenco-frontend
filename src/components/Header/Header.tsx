import React, { useContext } from "react";
import "./Header.css";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Typography } from "antd";
import { Link, useLocation } from "wouter";
import { UserOutlined } from "@ant-design/icons";
import { auth } from "../../functions/auth";
import SearchField from "../SearchField/SearchField";
import { UserContext } from "../../contexts/UserContext";
import { LOGO } from "../../env";

const dropMenu = (
	<Menu>
		<Menu.Item key="mexplore">
			<Link href="/explore" className="active">
				Explore
			</Link>
		</Menu.Item>
		<Menu.Item key="mfaq">
			<Link href="/faq">FAQ</Link>
		</Menu.Item>
		<Menu.Item key="mexplore">
			<Link href="/api">API</Link>
		</Menu.Item>
	</Menu>
);

function AppHeader(): JSX.Element {
	const userContext = useContext(UserContext);
	const setLocation = useLocation()[1];

	const handleLogout = async () => {
		try {
			auth.logout();
		} catch (e) {
			console.log(e);
		}
		userContext?.setUser(null);
		setLocation("/login");
	};

	const menu = (
		<Menu>
			<Menu.Item key="Menu1" style={{ cursor: "default" }}>
				Signed in as:<br></br>
				{userContext?.user?.username}
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="Menu2">
				<Link href="/user/subscriptions">Subscriptions</Link>
			</Menu.Item>
			<Menu.Item key="Menu3">
				<Link href="/user/feeds">Submitted podcasts</Link>
			</Menu.Item>
			<Menu.Item key="Menu4">
				<Link href="/new/feed">Submit a new podcast</Link>
			</Menu.Item>
			{auth.isAdmin(userContext?.user) && (
				<>
					<Menu.Divider />
					<Menu.Item key="Menu5">
						<Link href="/manage/new-feeds">Manage Feeds</Link>
					</Menu.Item>
				</>
			)}
			<Menu.Divider />
			<Menu.Item key="Menu6" onClick={handleLogout}>
				Logout
			</Menu.Item>
		</Menu>
	);

	const userMenu = (): JSX.Element => {
		if (userContext?.user) {
			return (
				<Dropdown key="btn-8861" overlay={menu} placement="bottomLeft" arrow>
					<Button>
						<UserOutlined />
					</Button>
				</Dropdown>
			);
		} else {
			return (
				<Link key="link771" href="/login" className="active">
					<Button>Login</Button>
				</Link>
			);
		}
	};

	return (
		<header className="Header">
			<div className="Header-inner">
				<div id="Header-title">
					<Link href="/">
						<img style={{ height: "2.5em" }} src={LOGO} alt="logo" />
						<Typography.Title level={1}>Elenco</Typography.Title>
					</Link>
				</div>
				<div id="Header-search">
					<SearchField />
				</div>

				<div id="Header-btns">
					<div className="Header-dropdown-more">
						<Dropdown overlay={dropMenu} arrow placement="bottomCenter">
							<Button>
								More <DownOutlined />
							</Button>
						</Dropdown>
					</div>

					<div className="Header-btns-group">
						<Link href="/explore" className="active">
							<Button type="default">Explore</Button>
						</Link>
						<Link href="/faq">
							<Button type="default">FAQ</Button>
						</Link>
						<Link href="/api">
							<Button type="default">API</Button>
						</Link>
					</div>
				</div>
				<div id="Header-menu">{userMenu()}</div>
			</div>
		</header>
	);
}

export default AppHeader;
