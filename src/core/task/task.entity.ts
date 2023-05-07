export interface Task {
	id: string;
	description: string;
	workRateId: string;
	totalTime: number;
	totalAmount: number;
	done: boolean;
	status: 'paused' | 'running';
}

export type TaskFilter = 'all' | 'pending' | 'done';
