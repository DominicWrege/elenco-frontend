import { Button, message } from "antd";
import "./Subscribe.css";
import { CheckOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
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
		await subOrUnSub(true, feedId, user.subscribe);
	};

	const unsubscribe = async (): Promise<void> => {
		await subOrUnSub(false, feedId, user.unsubscribe);
	};

	const subOrUnSub = async (
		status: boolean,
		id: number,
		call: (id: number) => Promise<void>
	): Promise<void> => {
		try {
			setIsLoading(true);
			await call(id);
			setIsSubscribed(status);
			message.success("Operation was successful");
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
