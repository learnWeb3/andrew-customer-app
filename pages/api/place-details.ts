import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  address: string;
  postCode: string;
  city: string;
  country: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(404);
  }
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=address_components&place_id=${req.body.input}&key=${process.env.GOOGLE_API_KEY}`;

  const response = await axios.get(url).then((response) => response.data);

  const address = `${
    response.result.address_components.find(
      (component: { types: string | string[] }) =>
        component.types.includes("street_number")
    )?.long_name
  } ${
    response.result.address_components.find(
      (component: { types: string | string[] }) =>
        component.types.includes("route")
    )?.long_name
  }`;

  const postCode = response.result.address_components.find(
    (component: { types: string | string[] }) =>
      component.types.includes("postal_code")
  )?.long_name;

  const city = response.result.address_components.find(
    (component: { types: string | string[] }) =>
      component.types.includes("locality")
  )?.long_name;

  const country = response.result.address_components.find(
    (component: { types: string | string[] }) =>
      component.types.includes("country")
  )?.long_name;

  res.status(200).json({ address, postCode, city, country });
}
