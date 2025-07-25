import axios from "axios";

import {
  Asset,
  Deposit,
  ManagerStats,
  PortfolioMetrics,
  QuickStats,
  UserAssetDetails,
  UserAssets,
} from "@/types/Deposit";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/deposit",
});

export async function SaveDeposit(id: string, Deposit: Deposit) {
  const formData = new FormData();

  Object.entries(Deposit).forEach(([key, value]) => {
    if (key === "nomineeDetails" || key === "uploadedDocuments") {
      formData.append(key, JSON.stringify(value));

      return;
    }

    if (key === "attachedFiles") {
      const files = value as Record<string, File>;

      Object.entries(files).forEach(([fieldName, file]) => {
        formData.append(fieldName, file);
      });

      return;
    }

    formData.append(key, value as string | Blob);
  });

  const response = await BACKEND.post("/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function GetAvailableFunds(userid: string) {
  const response: { data: { data: number } } = await BACKEND.get(
    `/availableFunds/${userid}`,
  );

  return response.data;
}
export async function AddAvailableFunds(userid: string, amount: number) {
  const response: { data: number } = await BACKEND.post(
    `/availableFunds/${userid}`,
    { amount: amount },
  );

  return response.data;
}

export async function BuyFunds(userid: string, data: any) {
  const response: { data: number } = await BACKEND.post(
    `/buyAsset/${userid}`,
    data,
  );

  return response.data;
}

export async function GetAssets(id: string) {
  const response: { data: { assets: Asset[] } } = await BACKEND.get(
    "/getAssets/" + id,
  );

  return response.data;
}

export async function GetPortfolioMetrics(id: string) {
  const response: { data: PortfolioMetrics } = await BACKEND.get(
    "/portfolioMetrics/" + id,
  );

  return response.data;
}

export async function GetUserAssetsInfo(id: string) {
  const response: { data: UserAssetDetails[] } = await BACKEND.get(
    "/userAssetsInfo/" + id,
  );

  return response.data;
}
export async function GetSingleAssetInfo(id: string, data: { isin: string }) {
  const response: { data: UserAssetDetails } = await BACKEND.post(
    "/singleAssetInfo/" + id,
    data,
  );

  return response.data;
}

export async function SellAsset(
  id: string,
  data: { isin: string; shares: number },
) {
  const response: { data: any } = await BACKEND.post("/sellAsset/" + id, data);

  return response.data;
}

export async function GetQuickStats(id: string) {
  const response: { data: QuickStats } = await BACKEND.get("/quickStats/" + id);

  return response.data;
}

export async function GetManagedUsersAssets(id: string) {
  const response: { data: UserAssets[] } = await BACKEND.get(
    "/managedUsersAssets/" + id,
  );

  return response.data;
}

export async function GetManagerStats(id: string) {
  const response: { data: ManagerStats } = await BACKEND.get(
    "/managerStats/" + id,
  );

  return response.data;
}