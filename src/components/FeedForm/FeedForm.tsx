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

export const NewFeed: React.FC<Properties> = ({ onSubmit }) => {

    const form = useRef<HTMLFormElement>(null); //TODO Fix me rm any

    const inputElement = useRef<Input>(null); //TODO Fix me rm any
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
        <div className="NewFeed-wrapper">
            <div className="NewFeed-content">
                <header className="NewFeed-header">
                    <Title level={3}>Submit New RSS-Feed</Title>
                </header>
                <form method="post" onSubmit={handleSubmit} className="NewFeed-form" ref={form}>
                    {/* {protocolSelect} */}
                    <Input name="feed-url" autoFocus required ref={inputElement}
                        className="NewFeed-input" placeholder="site.com/feed" type="url" />
                    <Button type="primary" htmlType="submit">
                        Preview
                    </Button>
                </form>
            </div>
        </div >
    );
};


export default NewFeed;