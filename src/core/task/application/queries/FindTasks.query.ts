import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { FindTasksDTO } from '@/core/task/domain/dtos/FindTasks.dto';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';

export class FindTasksQuery {
	static execute(params: FindTasksDTO): TaskEntity[] {
		return TaskRepository.findAll().filter(
			(task) =>
				params.status === 'all' ||
				(params.status === 'done' && task.done) ||
				(params.status === 'pending' && !task.done)
		);
	}
}
