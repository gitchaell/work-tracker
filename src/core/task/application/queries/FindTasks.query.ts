import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';
import { Task } from '@/core/task/domain/Task.model';
import { FindTasksDTO } from '@/core/task/domain/dtos/FindTasks.dto';

export class FindTasksQuery {
	static execute(params: FindTasksDTO): Task[] {
		return TaskRepository.findAll()
			.filter(
				(task) =>
					params.status === 'all' ||
					(params.status === 'done' && task.done) ||
					(params.status === 'pending' && !task.done)
			)
			.map((task) => TaskMapper.toModel(task));
	}
}
