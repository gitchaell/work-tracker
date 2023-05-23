export interface Task {
	id: string;
	description: string;
	totalSeconds: number;
	totalAmount: number;
	done: boolean;
	status: 'paused' | 'running';
	workId: string;
}
