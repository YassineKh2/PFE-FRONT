import axios from "axios";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/predict/",
});




export async function PredictMF(MFData:[],isin:string) {
  const response:{data:{data:{predictions:[]}}} = await BACKEND.post(`${isin}`,MFData);
  return response;
}

export async function GetPredictions(isin: string) {
    const response: { data: {data:{predictions:[]}} } = await BACKEND.get(`${isin}`);
    return response;
}
