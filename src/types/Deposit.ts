import { z } from "zod";

import {
  DepositSchema,
  DepositDetailsSchema,
  DepositOtherDetailsSchema,
} from "@/schemas/Deposit";

export type Deposit = z.infer<typeof DepositSchema>;

export type Section1 = z.infer<typeof DepositDetailsSchema>;

export type Section2 = z.infer<typeof DepositOtherDetailsSchema>;

export type Asset = {
  isin: string;
  name: string;
  NAV: string;
  shares: number;
  purchasedate: string;
};

export type PortfolioMetrics = {
  total_portfolio_value: number;
  total_gains: number;
  total_gains_percent: number;
  available_funds: number;
  this_month: number;
};

export type UserAssetDetails = {
  isin: string;
  fund_name: string;
  fund_category: string;
  fund_type: string;
  risk: string;
  amount_invested: number;
  current_nav: number;
  total_returns: number;
  total_units: number;
  gains: number;
  gains_percentage: number;
  todayChange: number;
};
