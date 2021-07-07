import { Button, Input } from "antd";
import "./FeedForm.css";

import { Typography } from 'antd';
import { useRef, useState } from "react";
import React from "react";
// const { Option } = Select;
const { Title } = Typography;

interface Properties {
    onSubmit: (SubmitEvent) => void
}

export interface SubmitEvent {
    protocol: string,
    url: URL
}

export const FeedForm: React.FC<Properties> = ({ onSubmit }) => {

    const form = useRef<HTMLFormElement>(null); 

    const inputElement = useRef<Input>(null); 
    const [protocol] = useState<string>("https://");

    // const handleProtocolChange = (value: string) => {
    //     setProtocol(value);
    // };

    // useEffect(() => {
    //     console.log(form.current);
    //     form.current?.reset();
    // }, [])

    // const protocolSelect = (
    //     <Select defaultValue={protocol} onChange={handleProtocolChange}>
    //         <Option value="http://">http://</Option>
    //         <Option value="https://">https://</Option>
    //     </Select>
    // );

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        if (inputElement.current) {
            try {
                const data: SubmitEvent = {
                    url: new URL(inputElement.current.input.value),
                    protocol: protocol
                };
                onSubmit(data);
            } catch (e) {
                console.error(e);
            }

        }
    };

    return (
        <div className="FeedForm">
            <header className="FeedForm-header">
                <Title level={3}>Submit New RSS-Feed</Title>
            </header>
            <form method="post" onSubmit={handleSubmit} className="FeedForm-form" ref={form}>
                {/* {protocolSelect} */}
                <Input name="feed-url" autoFocus required ref={inputElement}
                    className="FeedForm-input" placeholder="site.com/feed" type="url" />
                <Button type="primary" htmlType="submit">
                    Submit Feed
                </Button>
            </form>
        </div >
    );
};


export default FeedForm;