import * as axios from "axios";
export const getPlaceAutocomplete = async (input) => {
  let data = JSON.stringify({
    input: input,
    includedRegionCodes: ["ca", "us"],
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://places.googleapis.com/v1/places:autocomplete",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": "<>",
    },
    data: data,
  };

  let res = await axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
    console.log(res);
    return res;
};
