export interface Task {
	id: string;
	description: string;
	workRateId: string;
	totalTime: number;
	totalAmount: number;
	status: 'stopped' | 'running' | 'closed';
}
