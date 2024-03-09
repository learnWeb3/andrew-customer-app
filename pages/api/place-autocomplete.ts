import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  components: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(404);
  }
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.body.input}&types=street_address|country|locality|route&key=${process.env.GOOGLE_API_KEY}&fields=address_components`;

  const components = await axios.get(url).then((response) => response.data);

  res.status(200).json({ components });
}
