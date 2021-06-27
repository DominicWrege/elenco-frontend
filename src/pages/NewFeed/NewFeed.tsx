import { Button, Card, Result, Steps } from "antd";
import "./NewFeed.css";
import { useEffect } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import Guard from "../../components/Guard/Guard";
import Preview from "../Preview/Preview";
import SubmitFeed from "../SubmitFeed/SubmitFeed";


const base = "/new";


function stepperState(path: string): number {
    if (path.endsWith("preview")) {
        return 1;
    } else if (path.endsWith("done")) {
        return 2;
    }
    return 0;
}

export const NewFeed: React.FC = () => {

    const location = useLocation()[0];

    useEffect(() => {
    }, [location])

    return (
        <div className="NewFeed">
            <Steps progressDot current={stepperState(location)}>
                <Steps.Step title="Submit" />
                <Steps.Step title="Preview" />
                <Steps.Step title="Done" />
            </Steps>
            <Switch>
                <Route path={`${base}/preview`} component={Preview}></Route>
                <Route path={`${base}/feed`}>
                    <Guard>
                        <SubmitFeed />
                    </Guard>
                </Route>
                <Route path={`${base}/done`}>
                    <Card >
                        <Result
                            status="success"
                            title="Successfully submitted!"
                            subTitle="Thank for submitting a new RSS-Feed. Your Feed will be review sortly."
                            extra={[
                                <Link key="rb-link-profile" href={encodeURI("/user/feeds?select=Queued")}>
                                    <Button type="primary" key="rb-profile">
                                        Go Submitted Feeds
                                    </Button>
                                </Link>,
                            ]}
                        />
                    </Card>
                </Route>
            </Switch>
            {/*  */}
        </div>
    );
};


export default NewFeed;