import cors from "cors";
import express from "express";
import { createCustomer, createInvoice, getAccessToken, getCustomerByName } from "./controllers/zohoController.js";
const app = express();

app.use(express.json());
app.use(cors());
const port = 3000;
const authRedirectUriBase = "http://localhost:3001/";
const authRedirectUriPath = "authCode";

app.post("/createCustomer", async (req, res) => {
    let name = req.body.name;
    let authCode = req.body.authCode;
    let access_token = await getAccessToken(authCode, authRedirectUriBase);
    try {
        let response = await createCustomer(name, "837904315", access_token);
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
        let invRes = await createInvoice(
            customer_id,
            [
                {
                    item_id: "4692903000000183057",
                },
                {
                    item_id: "4692903000000183057",
                },
                {
                    item_id: "4692903000000183057",
                },
            ],
            "837904315",
            access_token
        ).then((invRes1) => {
            res.status(invRes1.status);
            res.send(invRes1.data);
        });
    } else {
        res.send("customer does not exist");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
