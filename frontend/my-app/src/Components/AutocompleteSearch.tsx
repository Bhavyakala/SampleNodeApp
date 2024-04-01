import { Autocomplete, LoadScript } from "@react-google-maps/api";
import React from "react";
import { Address } from "../Models/Address";
import AddressForm from "./AddressForm";

export const AutocompleteSearch: React.FunctionComponent = () => {
    const inputRef = React.useRef<google.maps.places.Autocomplete>();
    const [address, setAddress] = React.useState<Address>({
        address: "",
        postcode: "",
        locality: "",
        state: "",
        country: "",
    });
    const handlePlaceChange = () => {
        if (inputRef.current) {
            let place = inputRef.current.getPlace();
            let curAdd: Address = {
                address: "",
                postcode: "",
                locality: "",
                state: "",
                country: "",
            };
            place.address_components?.forEach((component) => {
                const componentType = component.types[0];

                switch (componentType) {
                    case "street_number": {
                        curAdd.address = `${component.long_name} ${curAdd.address}`;
                        break;
                    }

                    case "route": {
                        curAdd.address += component.long_name;
                        break;
                    }

                    case "postal_code": {
                        curAdd.postcode = `${component.long_name}${curAdd.postcode}`;
                        break;
                    }

                    case "postal_code_suffix": {
                        curAdd.postcode = `${curAdd.postcode}-${component.long_name}`;
                        break;
                    }
                    case "locality":
                        curAdd.locality = component.long_name;
                        break;
                    case "administrative_area_level_1": {
                        curAdd.state = component.short_name;
                        break;
                    }
                    case "country":
                        curAdd.country = component.long_name;
                        break;
                }
            });
            setAddress(curAdd);
            console.log(curAdd);
        }
    };

    return (
        <div>
            <LoadScript googleMapsApiKey={"AIzaSyDrKmgcCqJ_LFZsyqJbOZD32DtALcpoyt4"} libraries={["places"]}>
                <Autocomplete onLoad={(ref) => (inputRef.current = ref)} onPlaceChanged={handlePlaceChange}>
                    <input
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                            fontSize: "16px",
                        }}
                        type="text"
                        placeholder="Search for a place"
                    />
                </Autocomplete>
            </LoadScript>
            <AddressForm {...address} />
        </div>
    );
};
