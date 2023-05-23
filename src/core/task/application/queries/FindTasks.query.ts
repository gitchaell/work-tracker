import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { Task } from '@/core/task/domain/Task.entity';
import { FindTasksDTO } from '../../domain/Task.dto';

export class FindTasksQuery {
	static execute(params: FindTasksDTO): Task[] {
		const tasks = TaskRepository.findAll();

		return tasks.filter(
			(task) =>
				params.status === 'all' ||
				(params.status === 'done' && task.done) ||
				(params.status === 'pending' && !task.done)
		);
	}
}
