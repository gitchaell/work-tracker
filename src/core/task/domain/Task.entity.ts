export type TaskStatus = 'paused' | 'running';

export interface Task {
	id: string;
	description: string;
	totalSeconds: number;
	totalAmount: number;
	done: boolean;
	status: TaskStatus;
	workId: string;
}
