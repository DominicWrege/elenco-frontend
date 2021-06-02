import { Button, Input, Select } from "antd";
import "./FeedForm.css";

import { Typography } from 'antd';
import { useRef, useState } from "react";
const { Option } = Select;
const { Title } = Typography;

interface Properties {
    onSubmit: (SubmitEvent) => void
}

export interface SubmitEvent {
    protocol: string,
    url: string
}

export function NewFeed({ onSubmit }) {

    const form = useRef<HTMLFormElement>(null); //TODO Fix me rm any

    const inputElement = useRef<Input>(null); //TODO Fix me rm any
    const [protocol, setProtocol] = useState<string>("https://");


    const handleProtocolChange = (value: string) => {
        setProtocol(value);
    };

    // useEffect(() => {
    //     console.log(form.current);
    //     form.current?.reset();
    // }, [])

    const protocolSelect = (
        <Select defaultValue={protocol} onChange={handleProtocolChange}>
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        if (inputElement.current) {
            const data: SubmitEvent = {
                url: inputElement.current.input.value,
                protocol: protocol
            };
            onSubmit(data);
        }
        // console.log(form.current?.elements[0].nodeValue);
        // console.log(event);s
        // console.log(input);
        // const form = event.target as HTMLFormElement;
        // // console.log(form);
        // console.log(form.current);

        // a.querySelector("")
        // send form to backend
    };
    // const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    //     console.log(event);
    //     setInput(event.currentTarget.value);

    // }
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
}





export default NewFeed;