import { Card, Typography } from "antd";
import React from "react";
import { Link } from "wouter";
const { Text } = Typography;

const Faq = () => {
	return (
		<Card title="FAQ" style={{ height: "fit-content" }}>
			<div style={{ height: "fit-content" }}>
				<Text strong>What is Elenco?</Text>
				<p>
					Elenco is an open source independent Podcast Index where you can find
					or discover your favorite podcast.
				</p>
				<Text strong>How can I use it?</Text>
				<p>
					You can listen, discover new Podcasts and read comments from other
					users.
				</p>
				<Text strong>How can I add an new podcast?</Text>
				<p>
					If you want to add a currently non-existing podcast, you have to have
					an account, then you can submit a new RSS feed.<br></br> Every feed
					will be reviewed by other admins.
				</p>
				<Text strong>For which purpose do I need an account?</Text>
				<p>
					Only if you want to subscribe or provide feedback to your favorite
					Podcasts, you need to
					<Link href="/register"> sign up</Link> for an account.
				</p>

				<Text strong>How much costs Elenco?</Text>
				<p>Elenco is totally free.</p>

				<Text strong>Where can I contribute?</Text>
				<p>
					You can find it on{" "}
					<a
						href="https://github.com/DominicWrege/elenco"
						target="_blank"
						rel="noreferrer"
					>
						Github.com
					</a>
				</p>
			</div>
		</Card>
	);
};

export default Faq;
