import { NotFoundError } from '@/core/common/helpers/ErrorHandlers.helper';
import { Task } from '@/core/task/domain/Task.model';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { WorkRepository } from '@/core/work/infrastructure/Work.repository';

export class TaskMapper {
	static toEntity(task: Task): TaskEntity {
		return {
			id: task.id.get(),
			description: task.description.get(),
			seconds: task.seconds.get(),
			amount: task.amount.get(),
			done: task.done.get(),
			status: task.status.get(),
			workId: task.work.id.get(),
		};
	}

	static toModel(taskEntity: TaskEntity): Task {
		const work = WorkRepository.findById(taskEntity.workId);

		if (!work) {
			throw new NotFoundError('Work related to Task not found');
		}

		return Task.from(taskEntity, work);
	}
}
