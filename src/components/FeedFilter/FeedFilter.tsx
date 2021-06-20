import { Select } from "antd";
import { LabeledValue } from "antd/lib/select";
import { UserFeedModel } from "../../models/feeds";



function renderSortByOptions(sortBy: SortByType): JSX.Element[] {
    return Object.entries(sortBy).map(([key, prop]: [string, any]) => {
        return (
            <Select.Option key={prop.name} value={key}>
                {prop.name}
            </Select.Option>
        );
    });
}

export interface SortByType {
    title: SortByValue;
    author: SortByValue;
    oldest: SortByValue;
    newest: SortByValue
}

export interface SortByValue {
    name: string;
    compareFn: (feedA: UserFeedModel, feedB: UserFeedModel) => number;
}

enum Compare {
    Bigger,
    Less
}

export const sortBy: SortByType = {
    title: {
        name: "Titel",
        compareFn: (feedA: UserFeedModel, feedB: UserFeedModel): number => {
            return feedA.title.localeCompare(feedB.title);
        },
    },
    author: {
        name: "Author",
        compareFn: (feedA: UserFeedModel, feedB: UserFeedModel): number => {
            return feedA.authorName.localeCompare(feedB.authorName);
        },
    },
    oldest: {
        name: "Oldest",
        compareFn: (feedA: UserFeedModel, feedB: UserFeedModel): number => {
            return compareDate(feedA, feedB, Compare.Bigger)
        }
    },
    newest: {
        name: "Newest",
        compareFn: (feedA: UserFeedModel, feedB: UserFeedModel): number => {
            return compareDate(feedA, feedB, Compare.Less);
        }
    }
};


function compareDate(feedA: UserFeedModel, feedB: UserFeedModel, compare: Compare): number {
    const dateA = Date.parse(feedA.submitted);
    const dateB = Date.parse(feedB.submitted);

    if (dateA === dateB) {
        return 0;
    }

    if (Compare.Bigger === compare) {
        return dateA > dateB ? -1 : 1;
    } else if (Compare.Less === compare) {
        return dateA < dateB ? -1 : 1;
    }
    return 0;
}

interface Properties {
    onChange: (value: SortByValue) => void
}

export const FeedFilter: React.FC<Properties> = ({ onChange }) => {

    const handelSortChange = (
        value: string | number | LabeledValue,
        _option: any
    ): void => {
        onChange(sortBy[value.toString()]);
        // setCurrentSortBy(sortBy[value.toString()]);
    };

    return (<>
        <Select
            // placeholder="Select a person"
            defaultValue="title"
            onSelect={handelSortChange}
            style={{ width: "8rem" }}
        >
            {renderSortByOptions(sortBy)}
        </Select>
    </>);

}

export default FeedFilter;