export interface CreateTaskDTO {
	description: string;
	workId: string;
}

export interface UpdateTaskDTO {
	id: string;
	description: string;
	totalSeconds: number;
	totalAmount: number;
	done: boolean;
	workId: string;
}

export interface DeleteTaskDTO {
	id: string;
}

export interface FindTasksDTO {
	status: 'all' | 'pending' | 'done';
}
