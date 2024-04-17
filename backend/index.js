import cors from "cors";
import express from "express";
import milesData from "./Utils/miles.json" assert { type: "json" };
import { createCustomer, createInvoice, getAccessToken, getCustomerByName, markAsSentInvoice } from "./controllers/zohoController.js";
const app = express();

app.use(express.json());
app.use(cors());
const port = 3000;
const authRedirectUriBase = "http://localhost:3001/";
const authRedirectUriPath = "authCode";

app.post("/createCustomer", async (req, res) => {
    let authCode = req.body.authCode;
    let access_token = await getAccessToken(authCode, authRedirectUriBase);
    try {
        let response = await createCustomer("837904315", access_token);
        res.send(response.data);
    } catch (error) {
        throw error;
    }
});

app.post("/createInvoice", async (req, res) => {
    let customer_name = req.body.customer_name;
    let authCode = req.body.authCode;
    let access_token = await getAccessToken(authCode, authRedirectUriBase);
    let contacts = await getCustomerByName(customer_name, "837904315", access_token).then((res1) => {
        return res1.data.contacts;
    });

    if (contacts.length != 0) {
        let customer_id = contacts[0].contact_id;
        let line_items = [];
        for (let i in milesData.data) {
            let mile = milesData.data[i];
            let date = new Date(mile.displayDateLabel);
            line_items.push({
                item_id: "4692903000000183057",
                rate: mile.usedRates.rucRate,
                quantity: parseFloat(mile.miles),
                item_custom_fields: [
                    {
                        label: "Date",
                        value: date.getFullYear() + "-" + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) + "-" + date.getDate(),
                    },
                ],
            });
        }
        let invoice_id = await createInvoice(customer_id, line_items, "837904315", access_token).then((invRes) => {
            console.log(invRes.data);
            res.status(invRes.status);
            res.send(invRes.data);
            return invRes.data.invoice.invoice_id;
        });
        await markAsSentInvoice(invoice_id, "837904315", access_token).then((res) => {
            console.log(res.data);
        });
    } else {
        res.send("customer does not exist");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
