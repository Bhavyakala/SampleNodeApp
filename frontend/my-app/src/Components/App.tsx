import { IStackStyles, IStackTokens, PrimaryButton, Stack, StackItem, TextField } from "@fluentui/react";
import React from "react";
import { ProfileCards } from "../ProfileCards";
import { AutocompleteSearch } from "./AutocompleteSearch";
import axios from "axios";
import { zohoClientId } from "../utils/Constants";

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
    const [name, setName] = React.useState<string | undefined>();
    const [isAuthCode, setIsAuthCode] = React.useState<boolean>(false);
    const [authCode, setAuthCode] = React.useState<string>();

    React.useEffect(() => {
        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);
        console.log(window.location.href);
        console.log(authCodeRegex);
        if (isMatch) {
            const authCode = isMatch[1];
            console.log(authCode);
            setIsAuthCode(true);
            setAuthCode(authCode);
        }
    }, []);

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
                <StackItem>
                    <TextField
                        value={name}
                        onChange={(_, newValue) => {
                            setName(newValue as string);
                        }}
                    ></TextField>
                </StackItem>
                <StackItem>
                    <PrimaryButton
                        onClick={async () => {
                            if (isAuthCode && authCode) {
                                await axios
                                    .post("http://localhost:3000/createInvoice", {
                                        customer_name: name,
                                        authCode: authCode,
                                    })
                                    .then((res) => {
                                        console.log("in frontend res");
                                        console.log(res);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                                setIsAuthCode(false);
                                return;
                            }
                            let url =
                                "https://accounts.zoho.com/oauth/v2/auth?client_id=" +
                                +zohoClientId +
                                "&response_type=code&redirect_uri=http://localhost:3001/&scope=ZohoBooks.invoices.CREATE,ZohoBooks.invoices.READ,ZohoBooks.invoices.UPDATE,ZohoBooks.invoices.DELETE,ZohoBooks.contacts.CREATE,ZohoBooks.contacts.READ,ZohoInvoice.contacts.READ,ZohoInvoice.contacts.CREATE,ZohoInvoice.invoices.CREATE";
                            window.location.href = url;
                        }}
                    >
                        Zoho enter customer
                    </PrimaryButton>
                </StackItem>
            </Stack>
        </Stack>
    );
};
