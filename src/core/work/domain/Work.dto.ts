import { WorkExperienceYears, WorkMarketDemand } from './Work.constant';

export interface CreateWorkDTO {
	title: string;
	minSalary: number;
	experience: WorkExperienceYears;
	marketDemand: WorkMarketDemand;
	indirectCostsMonthly: number;
	profitMargin: number;
	workHoursPerDay: number;
	workDaysPerWeek: number;
	currencyId: string;
	date: string;
}

export interface UpdateWorkDTO {
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
	date: string;
}

export interface DeleteWorkDTO {
	id: string;
}
