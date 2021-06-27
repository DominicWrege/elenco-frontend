import "./SubmitFeed.css";
import FeedForm, { SubmitEvent } from "../../components/FeedForm/FeedForm";

import { useLocation } from "wouter";


export function SubmitFeed(): JSX.Element {
    const setLocation = useLocation()[1];

    const handleSubmit = (event: SubmitEvent): void => {
        const urlParam = event.url;
        const uri = encodeURI(`/new/preview?url=${urlParam}`);
        setLocation(uri);
    };

    return (
        <div className="SubmitFeed">
            <FeedForm onSubmit={handleSubmit} />
        </div>
    );
}


export default SubmitFeed;

