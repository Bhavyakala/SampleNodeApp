import axios from "axios";
import { zohoAccessTokenUrl, zohoClientId, zohoClientSecret } from "../Utils/Constants.js";
import infoData from "../Utils/info.json" assert { type: "json" };

export const getAccessToken = async (authCode, redirectUri) => {
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: zohoAccessTokenUrl,
        headers: {},
        params: {
            client_id: zohoClientId,
            client_secret: zohoClientSecret,
            grant_type: "authorization_code",
            redirect_uri: redirectUri,
            code: authCode,
        },
    };

    let res = await axios
        .request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    return res.access_token;
};

export const createCustomer = async (organization_id, access_token) => {
    let data = JSON.stringify({
        contact_name: infoData.info.fname + infoData.info.lname,
        contact_type: "customer",
        billing_address: {
            attention: infoData.info.fname,
            address: infoData.address.address1,
            city: infoData.address.city,
            state: infoData.address.state,
            zip: infoData.address.zipcode,
            country: infoData.address.country,
        },
        contact_persons: [
            {
                first_name: infoData.info.fname,
                last_name: infoData.info.lname,
                email: infoData.info.email,
                phone: infoData.info.phone,
                is_primary_contact: true,
            },
        ],
        customer_sub_type: "individual",
    });

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://www.zohoapis.com/books/v3/contacts?organization_id=" + organization_id,
        headers: {
            Authorization: "Bearer " + access_token,
            "content-type": "application/json",
        },
        data: data,
    };

    return await axios
        .request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const createInvoice = async (customer_id, line_items, organization_id, access_token) => {
    let data = JSON.stringify({
        customer_id: customer_id,
        status: "sent",
        line_items: line_items,
    });
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://www.zohoapis.com/books/v3/invoices?organization_id=" + organization_id,
        headers: {
            Authorization: "Bearer " + access_token,
            "content-type": "application/json",
        },
        data: data,
    };

    return await axios.request(config);
};

export const getCustomerByName = async (name, organization_id, access_token) => {
    let config = {
        method: "get",
        url: "https://www.zohoapis.com/books/v3/contacts?organization_id=" + organization_id,
        headers: {
            Authorization: "Bearer " + access_token,
            "content-type": "application/json",
        },
        params: {
            contact_name: name,
        },
    };
    let res = await axios.request(config);
    return res;
};

export const markAsSentInvoice = async (invoice_id, organization_id, access_token) => {
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://www.zohoapis.com/books/v3/invoices/${invoice_id}/status/sent?organization_id=${organization_id}`,
        headers: {
            Authorization: "Bearer " + access_token,
            "content-type": "application/json",
        },
    };

    return await axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getAccountReceivables = async (account_id, organization_id, access_token) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://www.zohoapis.com/books/v3/chartofaccounts/${account_id}?organization_id=${organization_id}`,
        headers: {
            Authorization: "Bearer " + access_token,
            "content-type": "application/json",
        },
    };

    return await axios
        .request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getRecievablesSummary = async (account_id, organization_id, access_token) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://books.zoho.com/api/v3/reports/receivablesummary?usestate=true&organization_id=${organization_id}`,
        headers: {
            Authorization: "Bearer " + access_token,
            "content-type": "application/json",
        },
    };

    return await axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getSalesAccount = async (organization_id, access_token) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://books.zoho.com/api/v3/reports/accounttransaction?page=1&per_page=500&cash_based=false&from_date=2024-04-01&to_date=2024-04-30&group_by=%5B%7B%22field%22%3A%22none%22%2C%22group%22%3A%22report%22%7D%5D&rule=%7B%22columns%22%3A%5B%7B%22index%22%3A1%2C%22field%22%3A%22account_id%22%2C%22group%22%3A%22report%22%2C%22comparator%22%3A%22in%22%2C%22value%22%3A%5B%224692903000000000388%22%5D%7D%5D%2C%22criteria_string%22%3A%221%22%7D&show_sub_account=false&filter_by=TransactionDate.CustomDate&usestate=false&response_option=0&organization_id=${organization_id}`,
        headers: {
            Authorization: "Bearer " + access_token,
            "content-type": "application/json",
        }
    };

    return await axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};
