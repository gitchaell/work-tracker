export interface FindTasksDTO {
	status: 'all' | 'pending' | 'done';
	workId: string;
}
