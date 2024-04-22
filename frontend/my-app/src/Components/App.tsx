import { DetailsList, IStackStyles, IStackTokens, PrimaryButton, Stack, StackItem, TextField } from "@fluentui/react";
import React from "react";
import { ProfileCards } from "../ProfileCards";
import { AutocompleteSearch } from "./AutocompleteSearch";
import axios from "axios";

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
    const [arData, setarData] = React.useState<[]>();

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
                            } else {
                                let url =
                                    "https://accounts.zoho.com/oauth/v2/auth?client_id=1000.A1EC3Q7JCFQ73T9Q3LGBMRURXGR25Y&response_type=code&redirect_uri=http://localhost:3001/&scope=ZohoBooks.invoices.CREATE,ZohoBooks.invoices.READ,ZohoBooks.invoices.UPDATE,ZohoBooks.invoices.DELETE,ZohoBooks.contacts.CREATE,ZohoBooks.contacts.READ,ZohoInvoice.contacts.READ,ZohoInvoice.contacts.CREATE,ZohoInvoice.invoices.CREATE,ZohoBooks.accountants.READ";
                                window.location.href = url;
                            }
                        }}
                    >
                        Create Invoice
                    </PrimaryButton>
                </StackItem>
                <StackItem>
                    <PrimaryButton
                        onClick={async () => {
                            if (isAuthCode && authCode) {
                                await axios
                                    .post("http://localhost:3000/createCustomer", {
                                        authCode: authCode,
                                    })
                                    .then((res) => {
                                        console.log(res);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                                setIsAuthCode(false);
                                return;
                            } else {
                                let url =
                                    "https://accounts.zoho.com/oauth/v2/auth?client_id=1000.A1EC3Q7JCFQ73T9Q3LGBMRURXGR25Y&response_type=code&redirect_uri=http://localhost:3001/&scope=ZohoBooks.invoices.CREATE,ZohoBooks.invoices.READ,ZohoBooks.invoices.UPDATE,ZohoBooks.invoices.DELETE,ZohoBooks.contacts.CREATE,ZohoBooks.contacts.READ,ZohoInvoice.contacts.READ,ZohoInvoice.contacts.CREATE,ZohoInvoice.invoices.CREATE,ZohoBooks.accountants.READ";
                                window.location.href = url;
                            }
                        }}
                    >
                        Create Customer
                    </PrimaryButton>
                </StackItem>
                <StackItem>
                    <PrimaryButton
                        onClick={async () => {
                            if (isAuthCode && authCode) {
                                await axios
                                    .get("http://localhost:3000/getSalesAccount", {
                                        params: {
                                            // account_id: "4692903000000000364",
                                            account_id: "4692903000000000388",
                                            authCode: authCode,
                                        },
                                    })
                                    .then((res) => {
                                        console.log(res.data);
                                        setarData(res.data?.account_transactions[0]?.account_transactions);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                                setIsAuthCode(false);
                                return;
                            } else {
                                let url =
                                    "https://accounts.zoho.com/oauth/v2/auth?client_id=1000.A1EC3Q7JCFQ73T9Q3LGBMRURXGR25Y&response_type=code&redirect_uri=http://localhost:3001/&scope=ZohoBooks.invoices.CREATE,ZohoBooks.invoices.READ,ZohoBooks.invoices.UPDATE,ZohoBooks.invoices.DELETE,ZohoBooks.contacts.CREATE,ZohoBooks.contacts.READ,ZohoInvoice.contacts.READ,ZohoInvoice.contacts.CREATE,ZohoInvoice.invoices.CREATE,ZohoBooks.accountants.READ,ZohoBooks.reports.READ";
                                window.location.href = url;
                            }
                        }}
                    >
                        Get Account receivables
                    </PrimaryButton>
                </StackItem>
                <StackItem>
                    {arData && (
                        <DetailsList
                            items={arData as any}
                            columns={[
                                {
                                    key: "id",
                                    name: "Customer Name",
                                    fieldName: "transaction_details",
                                    minWidth: 150,
                                },
                                {
                                    key: "id",
                                    name: "Date",
                                    fieldName: "date",
                                    minWidth: 0,
                                },
                                {
                                    key: "id",
                                    name: "type",
                                    fieldName: "transaction_type_formatted",
                                    minWidth: 0,
                                },
                                {
                                    key: "id",
                                    name: "debit",
                                    fieldName: "debit",
                                    minWidth: 0,
                                },
                                {
                                    key: "id",
                                    name: "credit",
                                    fieldName: "credit",
                                    minWidth: 0
                                },
                                {
                                    key: "id",
                                    name: "invoice",
                                    fieldName: "entity_number",
                                    minWidth: 0
                                }
                            ]}
                        ></DetailsList>
                    )}
                </StackItem>
            </Stack>
        </Stack>
    );
};
