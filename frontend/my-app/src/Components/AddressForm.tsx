import { DefaultButton, Stack, TextField } from "@fluentui/react";
import { Address } from "../Models/Address";
export const AddressForm = (autocompleteValues: Address) => {
    console.log(autocompleteValues);

    // Default values for the form fields
    const defaultValues = {
        addressLine: autocompleteValues.address || "",
        country: autocompleteValues.country || "",
        state: autocompleteValues.state || "",
        postalCode: autocompleteValues.postcode || "",
        locality: autocompleteValues.locality || "",
    };

    return (
        <Stack tokens={{ childrenGap: 8 }}>
            <TextField label="Address Line" value={defaultValues.addressLine} required style={{}} />
            <TextField label="State" value={defaultValues.state} required />
            <TextField label="Postal Code" value={defaultValues.postalCode} required />
            <TextField label="Country" value={defaultValues.country} required />
            <TextField label="Locality" value={defaultValues.locality} required />
            <DefaultButton
                text="Submit"
                onClick={() => {
                    console.log("Submitted");
                    console.log(defaultValues);
                }}
            />
        </Stack>
    );
};

export default AddressForm;
