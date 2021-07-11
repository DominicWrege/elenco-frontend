import { Button, message } from "antd";
import "./Subscribe.css";
import { CheckOutlined } from "@ant-design/icons";
import { FC, useCallback, useEffect, useState } from "react";
import { user } from "../../../functions/user";

interface Property {
	status: boolean;
	feedId: number;
	className?: string;
}

export const SubscribeButton: FC<Property> = ({ status, feedId }) => {
	const [isSubscribed, setIsSubscribed] = useState<boolean>(status);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const subscribe = async (): Promise<void> => {
		try {
			setIsLoading(true);
			await user.subscribe(feedId);
			setIsSubscribed(true);
			message.success("This is a success message");
		} catch (err) {
			console.log(err);
			message.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	const unsubscribe = async (): Promise<void> => {
		try {
			setIsLoading(true);
			await user.unsubscribe(feedId);
			setIsSubscribed(false);
			message.success("This is a success message");
		} catch (err) {
			message.error("Something went wrong");
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	if (isSubscribed) {
		return (
			<Button
				id="Subscribe-primary-accent-ghost"
				type="primary"
				icon={<CheckOutlined />}
				loading={isLoading}
				onClick={unsubscribe}
			>
				Subscribed
			</Button>
		);
	}
	return (
		<Button
			id="Subscribe-primary-accent"
			className="Subscribe"
			type="primary"
			loading={isLoading}
			onClick={subscribe}
		>
			Subscribe
		</Button>
	);
};
