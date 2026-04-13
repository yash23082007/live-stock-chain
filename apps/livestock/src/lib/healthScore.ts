/**
 * Health Score Calculation Algorithm
 * Base: 100
 * Deductions and bonuses applied based on health history
 */

export function calculateHealthScore(params: {
  activeIllnessInLast30Days: boolean;
  currentlyUnderWithdrawal: boolean;
  overdueVaccinationCount: number;
  highSeverityEventInLast90Days: boolean;
  daysSinceLastVetCheck: number | null;
  weightDecliningFor3Months: boolean;
  allVaccinationsUpToDate: boolean;
  noHealthEventsInLast6Months: boolean;
}): number {
  let score = 100;

  // Deductions
  if (params.activeIllnessInLast30Days) score -= 20;
  if (params.currentlyUnderWithdrawal) score -= 10;
  score -= params.overdueVaccinationCount * 15;
  if (params.highSeverityEventInLast90Days) score -= 10;
  if (params.daysSinceLastVetCheck === null || params.daysSinceLastVetCheck > 180) score -= 5;
  if (params.weightDecliningFor3Months) score -= 10;

  // Bonuses
  if (params.allVaccinationsUpToDate) score += 5;
  if (params.noHealthEventsInLast6Months) score += 5;

  return Math.max(0, Math.min(100, score));
}

export function getHealthScoreBand(score: number): {
  level: "excellent" | "good" | "fair" | "poor" | "critical";
  color: string;
  bgColor: string;
} {
  if (score >= 90) {
    return { level: "excellent", color: "text-green-700", bgColor: "bg-green-100" };
  } else if (score >= 70) {
    return { level: "good", color: "text-emerald-600", bgColor: "bg-emerald-100" };
  } else if (score >= 50) {
    return { level: "fair", color: "text-yellow-600", bgColor: "bg-yellow-100" };
  } else if (score >= 30) {
    return { level: "poor", color: "text-orange-600", bgColor: "bg-orange-100" };
  } else {
    return { level: "critical", color: "text-red-700", bgColor: "bg-red-100" };
  }
}
