import { Currency } from '../currency/currency.entity';

type ExperienceYears = '0-1' | '2-3' | '4-5' | '6-7' | '8-9' | '10+';
type MarketDemand = 'Low' | 'Normal' | 'High';

export interface WorkProfile {
	id: string;
	minSalary: number;
	experience: ExperienceYears;
	marketDemand: MarketDemand;
	indirectCostsMonthly: number;
	profitMargin: number;
	workHoursPerDay: number;
	workDaysPerWeek: number;
	currency: Currency;
}
