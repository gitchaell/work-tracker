import { NotFoundError } from '@/core/common/helpers/ErrorHandlers.helper';
import { Task } from '@/core/task/domain/Task.model';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { WorkMapper } from '@/core/work/infrastructure/Work.mapper';
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
			startedAt: task.startedAt.get(),
			createdAt: task.createdAt.get(),
			workId: task.work.id.get(),
		};
	}

	static toModel(taskEntity: TaskEntity): Task {
		const work = WorkRepository.findById(taskEntity.workId);

		if (!work) {
			throw new NotFoundError('Work related to Task not found');
		}

		const task = new Task();

		task.id.set(taskEntity.id);
		task.description.set(taskEntity.description);
		task.seconds.set(taskEntity.seconds);
		task.amount.set(taskEntity.amount);
		task.done.set(taskEntity.done);
		task.status.set(taskEntity.status);
		task.startedAt.set(taskEntity.startedAt);
		task.createdAt.set(taskEntity.createdAt);

		task.setWork(WorkMapper.toModel(work));

		return task;
	}
}
