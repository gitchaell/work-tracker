import { v4 as uuidv4 } from 'uuid';
import { Currency } from '../currency/currency.entity';

export type ExperienceYears = '0-1' | '2-3' | '4-5' | '6-7' | '8-9' | '10+';
export type MarketDemand = 'Low' | 'Normal' | 'High';

export const EXPERIENCE_YEARS_FACTOR: Record<ExperienceYears, number> = {
	'0-1': 1.0,
	'2-3': 1.2,
	'4-5': 1.4,
	'6-7': 1.6,
	'8-9': 1.8,
	'10+': 2.0,
};

export const MARKET_DEMAND_FACTOR: Record<MarketDemand, number> = {
	Low: 1.0,
	Normal: 1.1,
	High: 1.2,
};

export interface WorkRate {
	perHour: number;
	perDay: number;
	perWeek: number;
	perMonth: number;
	perYear: number;
	currencyId: string;
}

interface NewWorkProfile {
	title: string;
	minSalary: number;
	experience: ExperienceYears;
	marketDemand: MarketDemand;
	indirectCostsMonthly: number;
	profitMargin: number;
	workHoursPerDay: number;
	workDaysPerWeek: number;
	currencyId: string;
}

export class WorkProfile {
	id: string;
	title: string;
	minSalary: number;
	experience: ExperienceYears;
	marketDemand: MarketDemand;
	indirectCostsMonthly: number;
	profitMargin: number;
	workHoursPerDay: number;
	workDaysPerWeek: number;
	currencyId: string;
	rate: WorkRate;
	date: string;

	constructor({
		title,
		minSalary,
		experience,
		marketDemand,
		indirectCostsMonthly,
		profitMargin,
		workHoursPerDay,
		workDaysPerWeek,
		currencyId,
	}: NewWorkProfile) {
		this.id = uuidv4();
		this.title = title;
		this.minSalary = minSalary;
		this.experience = experience;
		this.marketDemand = marketDemand;
		this.indirectCostsMonthly = indirectCostsMonthly;
		this.profitMargin = profitMargin;
		this.workHoursPerDay = workHoursPerDay;
		this.workDaysPerWeek = workDaysPerWeek;
		this.currencyId = currencyId;
		this.rate = this.getRate();
		this.date = new Date().toISOString();
	}

	getRate() {
		return {
			perHour: this.calculateRate({ per: 'Hour' }),
			perDay: this.calculateRate({ per: 'Day' }),
			perWeek: this.calculateRate({ per: 'Week' }),
			perMonth: this.calculateRate({ per: 'Month' }),
			perYear: this.calculateRate({ per: 'Year' }),
			currencyId: this.currencyId,
		};
	}

	calculateRate({
		per,
	}: {
		per: 'Hour' | 'Day' | 'Week' | 'Month' | 'Year';
	}): number {
		const weeksPerMonth = 4;

		const workHoursPerWeek = this.workHoursPerDay * this.workDaysPerWeek;
		const workHoursPerYear = weeksPerMonth * workHoursPerWeek;

		const baseSalary =
			this.minSalary *
			EXPERIENCE_YEARS_FACTOR[this.experience] *
			MARKET_DEMAND_FACTOR[this.marketDemand];

		const indirectCostsByHour = this.indirectCostsMonthly / workHoursPerYear;
		const baseSalaryByHour = baseSalary / workHoursPerYear;

		const hourlyRate =
			(baseSalaryByHour + indirectCostsByHour) *
			((100 + this.profitMargin) / 100);

		const dailyRate = hourlyRate * this.workHoursPerDay;
		const weeklyRate = dailyRate * this.workDaysPerWeek;
		const monthlyRate = weeklyRate * 4;
		const yearlyRate = monthlyRate * 12;

		if (per === 'Hour') {
			return hourlyRate;
		} else if (per === 'Day') {
			return dailyRate;
		} else if (per === 'Week') {
			return weeklyRate;
		} else if (per === 'Month') {
			return monthlyRate;
		} else if (per === 'Year') {
			return yearlyRate;
		} else {
			return 0;
		}
	}
}
