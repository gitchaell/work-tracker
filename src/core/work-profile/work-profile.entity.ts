import { v4 as uuidv4 } from 'uuid';

export type ExperienceYears = '0-1' | '2-3' | '4-5' | '6-7' | '8-9' | '10+';
export type MarketDemand = 'Low' | 'Normal' | 'High';

export const ExperienceYearsFactor: Record<ExperienceYears, number> = {
	'0-1': 1.0,
	'2-3': 1.2,
	'4-5': 1.4,
	'6-7': 1.6,
	'8-9': 1.8,
	'10+': 2.0,
};

export const MarketDemandFactor: Record<MarketDemand, number> = {
	Low: 1.0,
	Normal: 1.1,
	High: 1.2,
};

export interface WorkRate {
	perSecond: number;
	perMinute: number;
	perHour: number;
	perDay: number;
	perWeek: number;
	perMonth: number;
	perYear: number;
	currencyId: string;
}

interface WorkProfileDto {
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
	}: WorkProfileDto) {
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

	getRate(): WorkRate {
		const weeksPerMonth = 4;

		const workHoursPerWeek = this.workHoursPerDay * this.workDaysPerWeek;
		const workHoursPerMonth = weeksPerMonth * workHoursPerWeek;

		const baseSalary =
			this.minSalary *
			ExperienceYearsFactor[this.experience] *
			MarketDemandFactor[this.marketDemand];

		const indirectCostsByHour = this.indirectCostsMonthly / workHoursPerMonth;
		const baseSalaryByHour = baseSalary / workHoursPerMonth;

		const hourlyRate =
			(baseSalaryByHour + indirectCostsByHour) * (1 + this.profitMargin / 100);

		const secondlyRate = hourlyRate / 3600;
		const minutelyRate = hourlyRate / 60;
		const dailyRate = hourlyRate * this.workHoursPerDay;
		const weeklyRate = dailyRate * this.workDaysPerWeek;
		const monthlyRate = weeklyRate * 4;
		const yearlyRate = monthlyRate * 12;

		return {
			perSecond: secondlyRate,
			perMinute: minutelyRate,
			perHour: hourlyRate,
			perDay: dailyRate,
			perWeek: weeklyRate,
			perMonth: monthlyRate,
			perYear: yearlyRate,
			currencyId: this.currencyId,
		};
	}
}
