import { IStackStyles, IStackTokens, Stack, StackItem } from "@fluentui/react";
import React from "react";
import { ProfileCards } from "../ProfileCards";
import { AutocompleteSearch } from "./AutocompleteSearch";

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

    return (
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
            <Stack tokens={{ childrenGap: 16 }}>
                <StackItem>
                    <Stack horizontal tokens={stackTokens}>
                        <ProfileCards />
                    </Stack>
                </StackItem>
                <StackItem>
                    <AutocompleteSearch></AutocompleteSearch>
                </StackItem>
            </Stack>
        </Stack>
    );
};
