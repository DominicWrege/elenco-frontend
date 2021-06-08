import { AutoComplete, Input, Select, Typography } from "antd";
import "./SearchField.css";
import React, { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { API_URL } from "../../env";
import { http } from "../../functions/http";
import { SearchProperties } from "../../pages/SearchResults/SearchResults";
import type { Completion } from "../../models/feeds";
const { Paragraph } = Typography;

// TODO get para an set the field
type InputEvent = React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>;


interface Option {
    value: string,
    label: string | JSX.Element
}


const SearchField: React.FC = () => {

    const [_location, setLocation] = useLocation();
    // @ts-ignore
    const [_match, params] = useRoute<SearchProperties>("/search/:query");
    const [completions, setCompletions] = useState<Option[]>([]);
    const uri = params?.query ? decodeURI(params.query) : ""
    const [value, setValue] = useState<string>(uri);


    const updateLocation = (searchTerm: string) => {
        const uri = `/search/${searchTerm}`;
        setLocation(uri);
    }

    const handleSearch = (searchTerm: string, _event?: InputEvent) => {
        if (searchTerm && searchTerm.trim().length > 0) { // TODO fix me
            updateLocation(searchTerm.trim());
        }
    }

    const fetchCompletion = async (query: string) => {
        const uri = `${API_URL}/api/completion/${query}`;
        let resp = await http.get(encodeURI(uri));
        let completions: Completion[] = await resp.json();
        setCompletions(renderOptions(completions));
    };
    const renderOptions = (completions: Completion[]): Option[] => {
        const ret = completions.map(completion => {
            return {
                value: completion.title,
                label: <div className="SearchField-option">
                    <Paragraph ellipsis>{completion.title}</Paragraph>
                    <small>{completion.authorName}</small>
                </div>,
            };
        });
        return ret;
    };

    // const debounce = (fn: any, delay: number) => {
    //     let timeOut;
    //     console.log(timeOut);
    //     return function (...args) {
    //         // if (timeOut) {
    //         //     clearTimeout(timeOut);
    //         // }
    //         console.log("huodsapi");
    //         timeOut = setTimeout(() => {
    //             // await fn((...args);
    //             console.log(111);
    //         }, 100);
    //         console.log(timeOut)
    //     }
    // };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setValue(value);
        let timeOut;
        if (timeOut) {
            clearTimeout(timeOut);
        }
        if (value?.trim().length > 1) {
            timeOut = setTimeout(async () => {
                await fetchCompletion(value);

            }, 200);
        }
    };

    const handleOnSelect = (selected: string): void => {
        setValue(selected);
        updateLocation(selected);
    };

    return (

        <AutoComplete value={value} onSelect={handleOnSelect} options={completions} dropdownClassName="completion-search-dropdown">
            <Input.Search placeholder="input search text" allowClear
                enterButton="Search"
                onSearch={handleSearch}
                onChange={handleOnChange}
                size="middle"
            // ref={input}
            />
        </AutoComplete>
    );
}

export default SearchField;
