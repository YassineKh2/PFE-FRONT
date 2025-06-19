import { Fund } from "@/types/MutualFunds";
import {
  ExperienceFormSchemaType,
  FinancialFormSchemaType,
  PreferencesFormSchemaType,
} from "@/types/Onbording";

export function ByRisk(Funds: Fund[]) {
  return function (
    riskLevel: "Low" | "Moderate" | "High" | "Very-High",
  ): Fund[] {
    return Funds.filter((fund) => fund.risk === riskLevel);
  };
}

export function ByRating(Funds: Fund[]) {
  return function (minRating: number): Fund[] {
    return Funds.filter((fund) => fund.rating >= minRating);
  };
}

export function By1YReturns(Funds: Fund[]) {
  return function (minReturn: number): Fund[] {
    return Funds.filter((fund) => parseFloat(fund.returns["1Y"]) >= minReturn);
  };
}

export function By3YReturns(Funds: Fund[]) {
  return function (minReturn: number): Fund[] {
    return Funds.filter((fund) => parseFloat(fund.returns["3Y"]) >= minReturn);
  };
}

export function By5YReturns(Funds: Fund[]) {
  return function (minReturn: number): Fund[] {
    return Funds.filter((fund) => parseFloat(fund.returns["5Y"]) >= minReturn);
  };
}

export function ByOverallReturns(Funds: Fund[]) {
  return function (minReturn: number): Fund[] {
    return Funds.filter(
      (fund) =>
        parseFloat(fund.returns["1Y"]) >= minReturn &&
        parseFloat(fund.returns["3Y"]) >= minReturn &&
        parseFloat(fund.returns["5Y"]) >= minReturn,
    );
  };
}

export function ByExpenseRatio(Funds: Fund[]) {
  return function (maxExpenseRatio: number): Fund[] {
    return Funds.filter((fund) => fund.expense_ratio <= maxExpenseRatio);
  };
}

export function ByFundSize(Funds: Fund[]) {
  return function (minFundSize: number): Fund[] {
    return Funds.filter((fund) => parseFloat(fund.fundSize) >= minFundSize);
  };
}

export function ByNAVFlow(Funds: Fund[]) {
  return function (minNAVFlow: number): Fund[] {
    return Funds.filter((fund) => fund.NAV_Flow >= minNAVFlow);
  };
}

export function ByVolatility(Funds: Fund[]) {
  return function (maxVolatility: number): Fund[] {
    return Funds.filter((fund) => fund.volatility <= maxVolatility);
  };
}
export function calculateLiquidityScore(
  fund: Fund,
  userLiquidityNeeds: number,
): number {
  let score = 0;

  // Apply a liquidity weight multiplier.
  // If the user needs liquidity (userLiquidityNeeds > 0), use full weight (1).
  // If not (userLiquidityNeeds === 0), liquidity is less important so use half weight (0.5).
  const liquidityWeight = userLiquidityNeeds > 0 ? 1 : 0.5;

  // Fund Structure: Open-Ended funds are preferred.
  if (fund.fundStructure.toLowerCase() === "open-ended") {
    score += 20 * liquidityWeight;
  } else {
    score += 5 * liquidityWeight;
  }

  // Redemption Frequency: More frequent redemption options are better.
  if (fund.redemptionFrequency.toLowerCase() === "daily") {
    score += 20 * liquidityWeight;
  } else if (fund.redemptionFrequency.toLowerCase() === "weekly") {
    score += 10 * liquidityWeight;
  } else {
    score += 5 * liquidityWeight;
  }

  // Exit Load: Lower exit loads are better.
  const exitLoadValue = parseFloat(fund.exitLoad.replace("%", ""));

  if (exitLoadValue <= 0) {
    score += 20 * liquidityWeight;
  } else if (exitLoadValue <= 0.5) {
    score += 15 * liquidityWeight;
  } else if (exitLoadValue <= 1) {
    score += 10 * liquidityWeight;
  } else {
    score += 5 * liquidityWeight;
  }

  // Lock-In Period Adjustment:
  // If the user requires liquidity (userLiquidityNeeds > 0), prefer funds with lock-in <= userLiquidityNeeds.
  // If userLiquidityNeeds is 0 (long-term investor), then a lock-in period is acceptable or even desirable.
  if (userLiquidityNeeds > 0) {
    if (fund.lockInPeriod <= userLiquidityNeeds) {
      score += 20 * liquidityWeight;
    } else if (fund.lockInPeriod <= userLiquidityNeeds + 6) {
      score += 10 * liquidityWeight;
    } else {
      score += 5 * liquidityWeight;
    }
  } else {
    // For long-term investors, reward funds with a lock-in period (they're designed for long-term investing)
    // but still give a bonus for funds with no lock-in.
    if (fund.lockInPeriod === 0) {
      score += 10;
    } else {
      score += 20;
    }
  }

  // Underlying Asset Liquidity: Higher liquidity in underlying assets is preferred.
  const assetLiquidity = fund.underlyingAssetLiquidity.toLowerCase();

  if (assetLiquidity === "high") {
    score += 20 * liquidityWeight;
  } else if (assetLiquidity === "medium") {
    score += 10 * liquidityWeight;
  } else if (assetLiquidity === "low") {
    score += 5 * liquidityWeight;
  }

  return score;
}
export function computeRiskScore(
  fund: Fund,
  experienceData: ExperienceFormSchemaType,
): number {
  let score = 0;
  const risk = fund.risk;

  // --- Risk Preference Scoring ---
  if (experienceData.riskPreference === "low") {
    score +=
      risk === "Low"
        ? 20
        : risk === "Moderate"
          ? 10
          : risk === "High"
            ? 5
            : risk === "Very-High"
              ? 2
              : 0;
  } else if (experienceData.riskPreference === "moderate") {
    score +=
      risk === "Moderate"
        ? 20
        : risk === "Low"
          ? 10
          : risk === "High"
            ? 5
            : risk === "Very-High"
              ? 2
              : 0;
  } else if (experienceData.riskPreference === "high") {
    // Treat both Moderate and Very-High equally.
    score +=
      risk === "High"
        ? 20
        : risk === "Moderate" || risk === "Very-High"
          ? 10
          : risk === "Low"
            ? 2
            : 0;
  } else if (experienceData.riskPreference === "very-high") {
    score +=
      risk === "Very-High"
        ? 20
        : risk === "High"
          ? 10
          : risk === "Moderate"
            ? 5
            : risk === "Low"
              ? 2
              : 0;
  }

  // --- Volatility Scoring ---
  const fundVol = fund.volatility; // e.g., 18.5 means 18.5%

  if (experienceData.marketFluctuation === "low") {
    if (fundVol <= 5) score += 20;
    else if (fundVol <= 10) score += 10;
    else if (fundVol <= 15) score += 5;
    else score += 2;
  } else if (experienceData.marketFluctuation === "moderate") {
    if (fundVol <= 10) score += 20;
    else if (fundVol <= 15) score += 10;
    else score += 2;
  } else if (experienceData.marketFluctuation === "high") {
    if (fundVol > 15) score += 20;
    else if (fundVol > 10 && fundVol <= 15) score += 10;
    else if (fundVol > 5 && fundVol <= 10) score += 5;
    else if (fundVol <= 5) score += 2;
  } else if (experienceData.marketFluctuation === "very-high") {
    if (fundVol > 20) score += 20;
    else if (fundVol > 15 && fundVol <= 20) score += 10;
    else if (fundVol > 10 && fundVol <= 15) score += 5;
    else if (fundVol <= 10) score += 2;
  }

  // --- Experience Level Scoring ---
  const experienceLevel = experienceData.experienceLevel;

  if (experienceLevel === "beginner") {
    score -= risk === "High" ? 5 : risk === "Moderate" ? 3 : 2;
  } else if (experienceLevel === "intermediate") {
    score -= risk === "High" ? 3 : risk === "Moderate" ? 1 : 0;
  } else if (experienceLevel === "advanced" || experienceLevel === "expert") {
    score += risk === "High" ? 5 : risk === "Moderate" ? 3 : 2;
  }

  return score;
}

export function computePreferenceScore(
  fund: Fund,
  preferences: PreferencesFormSchemaType,
  sectorToAvoid: string[],
): number {
  let score = 0;

  // --- Asset Allocation Scoring ---
  if (
    preferences.assetAllocation.includes("equity") &&
    fund.category === "Equity"
  )
    score += 20;
  if (preferences.assetAllocation.includes("debt") && fund.category === "Debt")
    score += 20;
  if (
    preferences.assetAllocation.includes("real-estate") &&
    fund.category === "Real Estate"
  )
    score += 20;
  if (
    preferences.assetAllocation.includes("commodities") &&
    fund.category === "Commodities"
  )
    score += 20;
  if (
    preferences.assetAllocation.includes("fixed-income") &&
    fund.category === "Fixed Income"
  )
    score += 20;
  if (
    preferences.assetAllocation.includes("alternative-investments") &&
    fund.category === "Alternative Investments"
  )
    score += 20;
  if (
    preferences.assetAllocation.includes("cash-equivalents") &&
    fund.category === "Cash Equivalents"
  )
    score += 20;
  if (
    preferences.assetAllocation.includes("index") &&
    fund.category === "Index"
  )
    score += 20;

  // --- Sector Preference Scoring ---
  if (
    preferences.sectorPreference.includes("technology") &&
    fund.sector === "Technology"
  )
    score += 10;
  if (
    preferences.sectorPreference.includes("healthcare") &&
    fund.sector === "Healthcare"
  )
    score += 10;
  if (
    preferences.sectorPreference.includes("finance") &&
    fund.sector === "Finance"
  )
    score += 10;
  if (
    preferences.sectorPreference.includes("energy") &&
    fund.sector === "Energy"
  )
    score += 10;
  if (
    preferences.sectorPreference.includes("consumer-goods") &&
    fund.sector === "Consumer Goods"
  )
    score += 10;
  if (
    preferences.sectorPreference.includes("utilities") &&
    fund.sector === "Utilities"
  )
    score += 10;
  if (
    preferences.sectorPreference.includes("real-estate") &&
    fund.sector === "Real Estate"
  )
    score += 10;
  if (
    preferences.sectorPreference.includes("industrial") &&
    fund.sector === "Industrial"
  )
    score += 10;
  if (
    preferences.sectorPreference.includes("telecommunications") &&
    fund.sector === "Telecommunications"
  )
    score += 10;
  if (
    preferences.sectorPreference.includes("materials") &&
    fund.sector === "Materials"
  )
    score += 10;

  // --- Asset Allocations to Avoid Scoring ---
  if (sectorToAvoid.includes("equity") && fund.category === "Equity")
    score -= 20;
  if (sectorToAvoid.includes("debt") && fund.category === "Debt") score -= 20;
  if (sectorToAvoid.includes("real-estate") && fund.category === "Real Estate")
    score -= 20;
  if (sectorToAvoid.includes("commodities") && fund.category === "Commodities")
    score -= 20;
  if (
    sectorToAvoid.includes("fixed-income") &&
    fund.category === "Fixed Income"
  )
    score -= 20;
  if (
    sectorToAvoid.includes("alternative-investments") &&
    fund.category === "Alternative Investments"
  )
    score -= 20;
  if (
    sectorToAvoid.includes("cash-equivalents") &&
    fund.category === "Cash Equivalents"
  )
    score -= 20;
  if (sectorToAvoid.includes("index") && fund.category === "Index") score -= 20;

  // --- Tax Consideration Scoring ---
  const taxEfficiencyScore = fund.taxEfficiencyScore;

  if (
    preferences.taxConsideration === "taxHighBracket" &&
    taxEfficiencyScore >= 90
  )
    score += 10;
  if (
    preferences.taxConsideration === "taxEfficient" &&
    taxEfficiencyScore >= 80
  )
    score += 10;
  if (
    preferences.taxConsideration === "taxAdvantaged" &&
    taxEfficiencyScore >= 70
  )
    score += 10;
  if (
    preferences.taxConsideration === "taxHarvesting" &&
    taxEfficiencyScore >= 60
  )
    score += 10;

  // --- Liquidity Needs Scoring ---
  // preferences.liquidityNeeds is expected to be a string representing number of months.
  score += calculateLiquidityScore(fund, Number(preferences.liquidityNeeds));

  return score;
}

export function computeFinancialScore(
  fund: Fund,
  profile: FinancialFormSchemaType,
): number {
  let score = 0;

  // --- Goal Fit ---
  if (
    fund.suitableGoals.some(
      (goal) => goal.toLowerCase() === profile.primaryGoal.toLowerCase(),
    )
  ) {
    score += 20;
  }

  // --- Goal Time Frame Fit ---
  const goalTimeFrame = Number(profile.goalTimeFrame);

  if (goalTimeFrame < 5) {
    // short term (<5 months) – typically want safer funds
    if (fund.risk === "Low") score += 20;
    else if (fund.risk === "Moderate") score += 10;
    else score -= 5;
  } else {
    // long-term or moderate-term goals
    if (fund.risk === "High" || fund.risk === "Very-High") score += 20;
    else if (fund.risk === "Moderate") score += 10;
    else if (fund.risk === "Low") score += 5;
  }

  // --- Disposable Income / Savings Ratio ---
  const monthlyIncome = Number(profile.monthyIncome);
  const monthlyExpense = Number(profile.monthlyExpense) || 0;
  const netSavings = monthlyIncome - monthlyExpense;
  const savingsRatio = monthlyExpense > 0 ? netSavings / monthlyExpense : 0;

  if (savingsRatio >= 0.5) {
    if (fund.risk === "High" || fund.risk === "Very-High") score += 10;
    else if (fund.risk === "Moderate") score += 5;
    else if (fund.risk === "Low") score += 2;
  } else {
    if (fund.risk === "Low") score += 10;
    else if (fund.risk === "Moderate") score += 5;
    else if (fund.risk === "High" || fund.risk === "Very-High") score -= 10;
  }

  // --- Net Worth Factor ---
  const netWorthRatio =
    monthlyExpense > 0 ? Number(profile.estimatedNetWorth) / monthlyExpense : 0;

  if (netWorthRatio > 100) {
    if (fund.risk === "High" || fund.risk === "Very-High") score += 10;
  } else {
    if (fund.risk === "High" || fund.risk === "Very-High") score -= 5;
  }

  return score;
}
