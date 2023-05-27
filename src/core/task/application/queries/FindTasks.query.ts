import { Response } from '@/core/common/interfaces/Response.interface';
import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { Task } from '@/core/task/domain/Task.entity';
import { FindTasksDTO } from '@/core/task/domain/Task.dto';

export class FindTasksQuery {
	static execute(params: FindTasksDTO): Response<Task[]> {
		const tasks = TaskRepository.findAll().filter(
			(task) =>
				params.status === 'all' ||
				(params.status === 'done' && task.done) ||
				(params.status === 'pending' && !task.done)
		);

		return { data: tasks };
	}
}
