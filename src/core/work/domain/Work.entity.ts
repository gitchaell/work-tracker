import { WorkExperienceYears, WorkMarketDemand } from './Work.constant';

export interface Work {
	id: string;
	title: string;
	minSalary: number;
	experience: WorkExperienceYears;
	marketDemand: WorkMarketDemand;
	indirectCostsMonthly: number;
	profitMargin: number;
	workHoursPerDay: number;
	workDaysPerWeek: number;
	currencyId: string;
	rate: WorkRate;
	date: string;
}

export interface WorkRate {
	perSecond: number;
	perMinute: number;
	perHour: number;
	perDay: number;
	perWeek: number;
	perMonth: number;
	perYear: number;
}
