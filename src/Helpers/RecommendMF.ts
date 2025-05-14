import {
  Fund,
  ByRating,
  By1YReturns,
  By3YReturns,
  By5YReturns,
  ByExpenseRatio,
  ByFundSize,
  ByNAVFlow,
  calculateLiquidityScore,
  computeRiskScore,
  computePreferenceScore,
  computeFinancialScore,
} from "@/Helpers/FilterFunds";
import { ExperienceFormSchemaType, FinancialFormSchemaType, PreferencesFormSchemaType } from "@/types/Onbording";

export function RankByQuality(funds: Fund[]): Fund[] {
  // Assign a quality score to each fund
  const fundsWithScores = funds.map((fund) => {
    let score = 0;

    // Rating score (0-50 points)
    const ratingFilter = ByRating([fund]);
    if (ratingFilter(5).length)
      score += 50; // 5-star rating
    else if (ratingFilter(4).length)
      score += 40; // 4-star rating
    else if (ratingFilter(3).length) score += 30; // 3-star rating

    // Returns score (0-30 points)
    const oneYearReturnFilter = By1YReturns([fund]);
    const threeYearReturnFilter = By3YReturns([fund]);
    const fiveYearReturnFilter = By5YReturns([fund]);

    if (oneYearReturnFilter(10).length) score += 10; // 1Y return >= 10%
    if (threeYearReturnFilter(15).length) score += 10; // 3Y return >= 15%
    if (fiveYearReturnFilter(20).length) score += 10; // 5Y return >= 20%

    // Expense ratio score (0-20 points)
    const expenseRatioFilter = ByExpenseRatio([fund]);
    if (expenseRatioFilter(0.5).length)
      score += 20; // Expense ratio <= 0.5%
    else if (expenseRatioFilter(1).length) score += 10; // Expense ratio <= 1%

    return {
      ...fund,
      qualityScore: score,
    };
  });

  // Sort funds by quality score in descending order
  return fundsWithScores.sort((a, b) => b.qualityScore - a.qualityScore);
}

export function RankByTrending(funds: Fund[]): Fund[] {
  // Assign a trending score to each fund
  const fundsWithScores = funds.map((fund) => {
    let score = 0;

    // Fund Size score (0-50 points)
    const fundSizeFilter = ByFundSize([fund]);
    if (fundSizeFilter(10000).length)
      score += 50; // Fund Size >= 10,000
    else if (fundSizeFilter(5000).length)
      score += 30; // Fund Size >= 5,000
    else if (fundSizeFilter(2000).length) score += 10; // Fund Size >= 2,000

    // NAV Flow score (0-50 points)
    const navFlowFilter = ByNAVFlow([fund]);
    if (navFlowFilter(20).length)
      score += 50; // NAV Flow >= 20%
    else if (navFlowFilter(10).length)
      score += 30; // NAV Flow >= 10%
    else if (navFlowFilter(5).length) score += 10; // NAV Flow >= 5%

    return {
      ...fund,
      trendingScore: score,
    };
  });

  // Sort funds by trending score in descending order
  return fundsWithScores.sort((a, b) => b.trendingScore - a.trendingScore);
}

export function FinalRanking(funds: Fund[]): Fund[] {
  // Combine quality and trending scores to create a final ranking
  const fundsWithFinalScores = funds.map((fund) => {
    // Calculate quality score
    const qualityRankedFunds = RankByQuality([fund]);
    const qualityScore = qualityRankedFunds.length
      ? // @ts-ignore
        qualityRankedFunds[0].qualityScore
      : 0;

    // Calculate trending score
    const trendingRankedFunds = RankByTrending([fund]);
    const trendingScore = trendingRankedFunds.length
      ? // @ts-ignore
        trendingRankedFunds[0].trendingScore
      : 0;

    // Combine scores (e.g., weighted sum: 60% quality, 40% trending)
    const finalScore = qualityScore * 0.6 + trendingScore * 0.4;

    return {
      ...fund,
      finalScore,
    };
  });

  // Sort funds by final score in descending order
  return fundsWithFinalScores.sort((a, b) => b.finalScore - a.finalScore);
}


export function RankByRisk(
  funds: Fund[],
  Data: ExperienceFormSchemaType
): Fund[] {
  const fundsWithScores = funds.map((fund) => {
    let score = 0;

    // --- Risk Preference Scoring ---

    const risk = fund.risk
    if (Data.riskPreference === "low") {
      score += risk === "Low" ? 20
              : risk === "Moderate" ? 10
              : risk === "High" ? 5
              : risk === "Very-High" ? 2 : 0;
    } else if (Data.riskPreference === "moderate") {
      score += risk === "Moderate" ? 20
              : risk === "Low" ? 10
              : risk === "High" ? 5
              : risk === "Very-High" ? 2 : 0;
    } else if (Data.riskPreference === "high") {
      //then treat both "Moderate" and "Very-High" equally.
      score += risk === "High" ? 20
              : (risk === "Moderate" || risk === "Very-High") ? 10
              : risk === "Low" ? 2 : 0;
    } else if (Data.riskPreference === "very-high") {
      score += risk === "Very-High" ? 20
              : risk === "High" ? 10
              : risk === "Moderate" ? 5
              : risk === "Low" ? 2 : 0;
    }

    // --- Volatility Scoring ---
    const fundVol =  fund.volatility;

    if (Data.marketFluctuation === "low") {
      if (fundVol <= 5) score += 20;
      else if (fundVol <= 10) score += 10;
      else if (fundVol <= 15) score += 5;
      else score += 2;
    } else if (Data.marketFluctuation === "moderate") {
      if (fundVol <= 10) score += 20;
      else if (fundVol <= 15) score += 10;
      else if (fundVol <= 5) score += 5; 
      else score += 2;
    } else if (Data.marketFluctuation === "high") {
      if (fundVol > 15) score += 20;
      else if (fundVol > 10 && fundVol <= 15) score += 10;
      else if (fundVol > 5 && fundVol <= 10) score += 5;
      else if (fundVol <= 5) score += 2;
    } else if (Data.marketFluctuation === "very-high") {
      if (fundVol > 20) score += 20;
      else if (fundVol > 15 && fundVol <= 20) score += 10;
      else if (fundVol > 10 && fundVol <= 15) score += 5;
      else if (fundVol <= 10) score += 2;
    }

  
  // --- Experience Level Scoring ---
    const experienceLevel = Data.experienceLevel;

    if (experienceLevel === "beginner") {
      score -= risk === "High" ? 5 : risk === "Moderate" ? 3 : 2; 
        } else if (experienceLevel === "intermediate") {
      score -= risk === "High" ? 3 : risk === "Moderate" ? 1 : 0; 
        } else if (experienceLevel === "advanced" || experienceLevel === "expert") {
      score += risk === "High" ? 5 : risk === "Moderate" ? 3 : 2;
    }
    
  

    return { ...fund, riskScore: score };
  });

  // Sort funds by descending riskScore.
  return fundsWithScores.sort((a, b) => b.riskScore - a.riskScore);
}

export function RankByPreferences(
  funds: Fund[],
  preferences: PreferencesFormSchemaType,
  sectorToAvoid : String[]
): Fund[] {
  const fundsWithScores = funds.map((fund) => {
    let score = 0;

    // --- Asset Allocation Scoring ---
    if (preferences.assetAllocation.includes("equity") && fund.category === "Equity") {
      score += 20;
    }
    if (preferences.assetAllocation.includes("debt") && fund.category === "Debt") {
      score += 20;
    }
    if (
      preferences.assetAllocation.includes("real-estate") &&
      fund.category === "Real Estate"
    ) {
      score += 20;
    }
    if (
      preferences.assetAllocation.includes("commodities") &&
      fund.category === "Commodities"
    ) {
      score += 20;
    }
    if (
      preferences.assetAllocation.includes("fixed-income") &&
      fund.category === "Fixed Income"
    ) {
      score += 20;
    }
    if (
      preferences.assetAllocation.includes("alternative-investments") &&
      fund.category === "Alternative Investments"
    ) {
      score += 20;
    }
    if (
      preferences.assetAllocation.includes("cash-equivalents") &&
      fund.category === "Cash Equivalents"
    ) {
      score += 20;
    }

    // --- Sector Preference Scoring ---
    if (preferences.sectorPreference.includes("technology") && fund.sector === "Technology") {
      score += 10;
    }
    if (preferences.sectorPreference.includes("healthcare") && fund.sector === "Healthcare") {
      score += 10;
    }
    if (preferences.sectorPreference.includes("finance") && fund.sector === "Finance") {
      score += 10;
    }
    if (preferences.sectorPreference.includes("energy") && fund.sector === "Energy") {
      score += 10;
    }
    if (
      preferences.sectorPreference.includes("consumer-goods") &&
      fund.sector === "Consumer Goods"
    ) {
      score += 10;
    }
    if (preferences.sectorPreference.includes("utilities") && fund.sector === "Utilities") {
      score += 10;
    }
    if (
      preferences.sectorPreference.includes("real-estate") &&
      fund.sector === "Real Estate"
    ) {
      score += 10;
    }
    if (
      preferences.sectorPreference.includes("industrial") &&
      fund.sector === "Industrial"
    ) {
      score += 10;
    }
    if (
      preferences.sectorPreference.includes("telecommunications") &&
      fund.sector === "Telecommunications"
    ) {
      score += 10;
    }
    if (preferences.sectorPreference.includes("materials") && fund.sector === "Materials") {
      score += 10;
    }

    // --- Asset Allocations to Avoid Scoring ---
    if (sectorToAvoid.includes("equity") && fund.category === "Equity") {
      score -= 20;
    }
    if (sectorToAvoid.includes("debt") && fund.category === "Debt") {
      score -= 20;
    }
    if (
      sectorToAvoid.includes("real-estate") &&
      fund.category === "Real Estate"
    ) {
      score -= 20;
    }
    if (
      sectorToAvoid.includes("commodities") &&
      fund.category === "Commodities"
    ) {
      score -= 20;
    }
    if (
      sectorToAvoid.includes("fixed-income") &&
      fund.category === "Fixed Income"
    ) {
      score -= 20;
    }
    if (
      sectorToAvoid.includes("alternative-investments") &&
      fund.category === "Alternative Investments"
    ) {
      score -= 20;
    }
    if (
      sectorToAvoid.includes("cash-equivalents") &&
      fund.category === "Cash Equivalents"
    ) {
      score -= 20;
    }

    const taxEfficiencyScore = fund.taxEfficiencyScore; 
    // --- Tax Consideration Scoring ---
    if (preferences.taxConsideration === "taxHighBracket" && taxEfficiencyScore >= 90) {
      score += 10;
    }
    if (preferences.taxConsideration === "taxEfficient" && taxEfficiencyScore >= 80) {
      score += 10;
    }
    if (preferences.taxConsideration === "taxAdvantaged" && taxEfficiencyScore >= 70) {
      score += 10;
    }
    if (preferences.taxConsideration === "taxHarvesting" && taxEfficiencyScore >= 60) {
      score += 10;
    }

    // --- Liquidity Needs Scoring ---
    score += calculateLiquidityScore(fund,Number(preferences.liquidityNeeds))

    return { ...fund, preferenceScore: score };
  });

  // Sort funds by descending preferenceScore
  return fundsWithScores.sort((a, b) => b.preferenceScore - a.preferenceScore);
}

export function rankFundsByFinancialProfile(
  funds: Fund[],
  profile: FinancialFormSchemaType
): Fund[] {
  return funds
    .map((fund) => {
      let score = 0;

      if (fund.suitableGoals.some((goal) => goal.toLowerCase() === profile.primaryGoal.toLowerCase())) {
        score += 20;
      }

      const goalTimeFrame = Number(profile.goalTimeFrame)
      if (goalTimeFrame < 5) {
        if (fund.risk === "Low") score += 20;
        else if (fund.risk === "Moderate") score += 10;
        else score -= 5; 
      } else {
        if (fund.risk === "High" || fund.risk === "Very-High") score += 20;
        else if (fund.risk === "Moderate") score += 10;
        else if (fund.risk === "Low") score += 5;
      }

      const monthyIncome = Number(profile.monthyIncome)
      const monthlyExpense = Number(profile.monthlyExpense) ? Number(profile.monthlyExpense) : 0;
      const netSavings = monthyIncome - monthlyExpense;

      const savingsRatio =  netSavings / monthlyExpense
      if (savingsRatio >= 0.5) {
        if (fund.risk === "High" || fund.risk === "Very-High") {
          score += 10;
        } else if (fund.risk === "Moderate") {
          score += 5;
        } else if (fund.risk === "Low") {
          score += 2; 
        }
      } else {
        if (fund.risk === "Low") {
          score += 10;
        } else if (fund.risk === "Moderate") {
          score += 5;
        } else if (fund.risk === "High" || fund.risk === "Very-High") {
          score -= 10;
        }
      }
      const netWorthRatio =  Number(profile.estimatedNetWorth) / monthlyExpense;
      if (netWorthRatio > 100) {
        if (fund.risk === "High" || fund.risk === "Very-High") score += 10;
      } else {
        if (fund.risk === "High" || fund.risk === "Very-High") score -= 5;
      }

      return { ...fund, financialScore: score };
    })
    .sort((a, b) => b.financialScore - a.financialScore);
}

export function rankFundsComposite(
  funds: Fund[],
  experienceData: ExperienceFormSchemaType,
  preferencesData: PreferencesFormSchemaType,
  financialData: FinancialFormSchemaType,
  sectorToAvoid: string[]
): Fund[] {
  return funds
    .map((fund) => {
      const riskScore = computeRiskScore(fund, experienceData);
      const preferenceScore = computePreferenceScore(fund, preferencesData, sectorToAvoid);
      const financialScore = computeFinancialScore(fund, financialData);
      const compositeScore = riskScore + preferenceScore + financialScore;
      return { ...fund, compositeScore };
    })
    .sort((a, b) => b.compositeScore - a.compositeScore);
}

