import { Dropdown, IDropdownOption, IStackStyles, IStackTokens, SearchBox, Stack, StackItem } from "@fluentui/react";
import React from "react";
import { ProfileCards } from "../ProfileCards";
import { getPlaceAutocomplete } from "../utils/PlaceAutocomplete";

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
    root: {
        width: "960px",
        margin: "0 auto",
        textAlign: "center",
        color: "#605e5c",
    },
};

export const App: React.FunctionComponent = () => {
    const [searchText, setSearchText] = React.useState<string | undefined>("");
    const [dropDownoptions, setDropDownOptions] = React.useState<IDropdownOption[]>([]);
    const [selectedOption, setSelectedOption] = React.useState<IDropdownOption | undefined>();

    React.useEffect(() => {
        let res = getPlaceAutocomplete(searchText);
        res.then((data) => {
            setDropDownOptions(
                data.suggestions.map((item: any) => {
                    return {
                        key: item.placePrediction.placeId,
                        text: item.placePrediction.text.text,
                    };
                })
            );
        });
    }, [searchText]);

    return (
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
            <Stack tokens={{ childrenGap: 8 }}>
                <StackItem>
                    <Stack horizontal tokens={stackTokens}>
                        <ProfileCards />
                    </Stack>
                </StackItem>
                <StackItem>
                    <SearchBox
                        onChange={async (_, val) => {
                            setSearchText(val);
                        }}
                        value={searchText}
                    ></SearchBox>
                </StackItem>
                <StackItem>
                    <Dropdown
                        options={dropDownoptions}
                        onChange={(_, item) => {
                            setSelectedOption(item);
                        }}
                        selectedKey={selectedOption?.key}
                    ></Dropdown>
                </StackItem>
            </Stack>
        </Stack>
    );
};
