export interface MFResponse {
  meta: {
    fund_house: string;
    scheme_name: string;
    scheme_type: string;
    scheme_category: string;
    scheme_code: string;
  };
  data: {
    date: string;
    nav: string;
  }[];
}
export interface MutualFundDetails {
  ISIN: string;
  aum: number;
  category: string;
  channel_partner_code: string;
  code: string;
  crisil_rating: string;
  detail_info: string;
  direct: string;
  expense_ratio: string;
  expense_ratio_date: string;
  face_value: number | null;
  fund_category: string;
  fund_house: string;
  fund_manager: string;
  fund_name: string;
  fund_rating: number;
  fund_rating_date: string;
  fund_type: string;
  insta_redeem_max_amount: number;
  insta_redeem_min_amount: number;
  instant: string;
  investment_objective: string;
  jan_31_nav: number;
  last_nav: {
    date: string;
    nav: number;
  };
  lock_in_period: number;
  lump_available: string;
  lump_max: number;
  lump_min: number;
  lump_min_additional: number;
  lump_multiplier: number;
  maturity_type: string;
  name: string;
  nav: {
    date: string;
    nav: number;
  };
  plan: string;
  portfolio_turnover: number | null;
  redemption_allowed: string;
  redemption_amount_minimum: number;
  redemption_amount_multiple: number;
  redemption_quantity_minimum: number;
  redemption_quantity_multiple: number;
  reinvestment: string;
  returns: {
    date: string;
    inception: number;
    week_1: number;
    year_1: number;
    year_3: number;
    year_5: number;
  };
  short_code: string;
  short_name: string;
  sip_available: string;
  sip_dates: string[];
  sip_max: number;
  sip_maximum_gap: number;
  sip_min: number;
  sip_multiplier: number;
  sips: {
    sip_dates: string[];
    sip_frequency: string;
    sip_maximum_gap: string;
    sip_minimum_gap: string;
  }[];
  slug: string;
  start_date: string;
  stp_flag: string;
  switch_allowed: string;
  swp_flag: string;
  tags: string[];
  tax_period: number;
  upsizecode_sip_dates: string[];
  volatility: number;
}
export interface MutualFund {
  ISIN: string,
  name: string,
  nav: number,
  date: String,
  historical_nav: [[string,number]]
}

export type MFs = MutualFund[];

export type Fund = {
  name: string;
  amc: string;
  risk: "Low" | "Moderate" | "High" | "Very-High";
  rating: number;
  category: string;
  fundSize: string;
  returns: {
      "1Y": string;
      "3Y": string;
      "5Y": string;
  };
  taxEfficiencyScore: number;
  suitableGoals: string[];
  strategy: string;
  minInvestment: string;
  maxInvestment: string;
  expense_ratio: number;
  volatility: number;
  AUM: number;
  turnover: number;
  NAV_Flow: number; // Calculated by End Period AUM - Start Period AUM - investment Performance
  sector: string;
  fundStructure: string;
  redemptionFrequency: string;
  exitLoad: string;
  lockInPeriod: number;
  underlyingAssetLiquidity: string;
  isin: string;
  fund_manager: string;
  start_date: string;
  maturity_type: string;
  sip_available: "Yes" | "No";
  sip_multiplier: number;
  lump_available: "Yes" | "No";
  tax_period: number;
  latestnav: number;
};



