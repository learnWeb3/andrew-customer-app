import {
  DecodeVinValues,
  DecodeVinValuesResults,
  NhtsaResponse,
} from "@shaggytools/nhtsa-api-wrapper";
import { useEffect, useState } from "react";

export function useVINDecoder(vin: string) {
  const [decoded, setDecoded] = useState<DecodeVinValuesResults | null>(null);
  useEffect(() => {
    if (vin) {
      DecodeVinValues(vin)
        .then((value: NhtsaResponse<DecodeVinValuesResults>) => {
          setDecoded(value.Results[0]);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [vin]);
  return decoded;
}
