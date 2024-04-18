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
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}