export interface TaskEntity {
	id: string;
	description: string;
	seconds: number;
	amount: number;
	done: boolean;
	status: TaskStatusValues;
	startedAt: string;
	createdAt: string;
	workId: string;
}

export type TaskStatusValues = 'running' | 'paused';
