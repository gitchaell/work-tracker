export interface Task {
	id: string;
	description: string;
	hourlyRateId: string;
	hourlyRateValue: number;
	accumulatedTime: number;
	accumulatedAmount: number;
}
