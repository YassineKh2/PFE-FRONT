import axios from "axios";

const MFAPI = axios.create({
  baseURL: "https://mf.captnemo.in/",
});


export async function getMFDetails(isin:string) {
  const response= await MFAPI.get(`/kuvera/${isin}`);
  return response;
}

export async function getNavDetails(isin: string) {
    const response= await MFAPI.get(`/nav/${isin}`);
    return response;
}