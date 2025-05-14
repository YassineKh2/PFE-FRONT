import { MFResponse } from "@/types/MutualFunds";
import axios from "axios";

const MFAPI = axios.create({
  baseURL: "https://api.mfapi.in/",
});




export async function getMFs() {
  const response:{data:{}} = await MFAPI.get(`mf`);
  return response;
}

export async function getMFDetails(schemeCode: string) {
    const response:{data:MFResponse} = await MFAPI.get(`mf/${schemeCode}`);
    return response;
}