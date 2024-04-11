import axios from "axios";
import { zohoAccessTokenUrl, zohoClientId, zohoClientSecret } from "../Utils/Constants.js";

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

export const createCustomer = async (name, organization_id, access_token) => {
    let data = JSON.stringify({
        contact_name: name,
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
