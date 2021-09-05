import { Button, message } from "antd";
import "./Subscribe.css";
import { CheckOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { user } from "../../../functions/user";

interface Property {
	isSubscribed: boolean;
	feedId: number;
	className?: string;
	onSubscribe: (id: number) => Promise<void>;
	onUnSubscribe: (id: number) => Promise<void>;
}

export const SubscribeButton: FC<Property> = (
	{ isSubscribed = false,
		feedId,
		onSubscribe,
		onUnSubscribe
	}
) => {

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const subscribe = async (): Promise<void> => {
		await subOrUnsub(feedId, onSubscribe);
	};

	const unsubscribe = async (): Promise<void> => {
		await subOrUnsub(feedId, onUnSubscribe);
	};

	const subOrUnsub = async (
		id: number,
		call: (id: number) => Promise<void>
	): Promise<void> => {
		try {
			setIsLoading(true);
			await call(id);
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
