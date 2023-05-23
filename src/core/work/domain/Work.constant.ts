export type WorkExperienceYears = '0-1' | '2-3' | '4-5' | '6-7' | '8-9' | '10+';
export type WorkMarketDemand = 'Low' | 'Normal' | 'High';

export const WorkExperienceYearsFactor: Record<WorkExperienceYears, number> = {
	'0-1': 1.0,
	'2-3': 1.2,
	'4-5': 1.4,
	'6-7': 1.6,
	'8-9': 1.8,
	'10+': 2.0,
};

export const WorkMarketDemandFactor: Record<WorkMarketDemand, number> = {
	Low: 1.0,
	Normal: 1.1,
	High: 1.2,
};
