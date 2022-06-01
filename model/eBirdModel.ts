import Bird from "../interface/bird";
import config from "../config/config.json";
import Sighting from "../interface/sighting";

const eBirdModel = {
  getSwedishBirds: async function (): Promise<Bird[]> {
    const headers = new Headers();
    headers.append("X-eBirdApiToken", config.eBird_key);
    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow"
    };
    const codeResponse = await fetch(`${config.eBird_url}product/spplist/SE`, requestOptions as any);
    const codeResult = await codeResponse.json();
    const species = codeResult.join(",");
    const response = await fetch(`${config.eBird_url}ref/taxonomy/ebird?species=${species}&locale=en&fmt=json`, requestOptions as any);
    const result = response.json();
    return result;
  },
  getNearbySightings: async function (lat: number, lng: number): Promise<Sighting[]> {
    const headers = new Headers();
    headers.append("X-eBirdApiToken", config.eBird_key);
    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow"
    };
    const response = await fetch(`${config.eBird_url}data/obs/geo/recent?lat=${lat}&lng=${lng}&locale=sv`, requestOptions as any);
    const result = await response.json();
    return result;
  }
};

export default eBirdModel;
