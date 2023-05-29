export interface WorkEntity {
	id: string;
	title: string;
	minSalary: number;
	experience: WorkExperienceValues;
	demand: WorkDemandValues;
	profitMargin: {
		perMonth: number;
	};
	costs: {
		perMonth: number;
	};
	workHours: {
		perDay: number;
	};
	workDays: {
		perWeek: number;
	};
	rate: {
		perSecond: number;
		perMinute: number;
		perHour: number;
		perDay: number;
		perWeek: number;
		perMonth: number;
		perYear: number;
	};
	currencyId: string;
	createdAt: string;
}

export type WorkExperienceValues = '0-1' | '2-3' | '4-5' | '6-7' | '8-9' | '10+';

export type WorkDemandValues = 'Low' | 'Normal' | 'High';
