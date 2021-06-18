import { Button, message } from "antd";
import "./Subscribe.css";
import { CheckOutlined } from "@ant-design/icons";
import { FC, useCallback, useEffect, useState } from "react";
import { user } from "../../functions/user";

interface Property {
  feedId: number;
}

export const SubscribeButton: FC<Property> = ({ feedId }) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const load = useCallback(async () => {
    setIsSubscribed(await user.has_subscription(feedId));
  }, [feedId]);

  useEffect(() => {
    load();
  }, [load]);

  const subscribe = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await user.subscribe(feedId);
      setIsSubscribed(true);
      message.success("This is a success message");
    } catch (err) {
      console.log(err);
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
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed === false) {
    return (
      <>
        <Button
          id="Subscribe-primary-accent"
          type="primary"
          loading={isloading}
          onClick={subscribe}
        >
          Subscribe
        </Button>
      </>
    );
  } else if (isSubscribed === true) {
    return (
      <>
        <Button
          id="Subscribe-primary-accent-ghost"
          type="primary"
          icon={<CheckOutlined />}
          loading={isloading}
          onClick={unsubscribe}
        >
          Subscribed
        </Button>
      </>
    );
  } else {
    return <></>;
  }
};
