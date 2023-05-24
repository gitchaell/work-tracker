export interface CreateTaskDTO {
	description: string;
	totalSeconds: number;
	totalAmount: number;
	done: boolean;
	status: 'paused' | 'running';
	workId: string;
}

export interface UpdateTaskDTO {
	id: string;
	description: string;
	totalSeconds: number;
	totalAmount: number;
	done: boolean;
	status: 'paused' | 'running';
	workId: string;
}

export interface DeleteTaskDTO {
	id: string;
}

export interface FindTasksDTO {
	status: 'all' | 'pending' | 'done';
	workId: string;
}
