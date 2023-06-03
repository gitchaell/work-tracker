import { Task } from '@/core/task/domain/Task.model';
import { TaskTimedEvent } from '@/core/task/application/events/TaskTimed.event';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { TaskRepository } from '../../infrastructure/Task.repository';

export class TimeTaskCommand {
	static timers: Record<string, Task> = {};

	static startTask(task: Task | TaskEntity): TaskEntity {
		if (task instanceof Task) {
			task = TaskMapper.toEntity(task);
		}

		TimeTaskCommand.timers[task.id] = TaskMapper.toModel(task);
		TimeTaskCommand.timers[task.id].start((taskUpdated: Task) => {
			const taskEntity = TaskMapper.toEntity(taskUpdated);
			TaskRepository.update(taskEntity);
			TaskTimedEvent.publish({ task: taskEntity });
		});

		return task;
	}

	static stopTask(task: Task | TaskEntity): TaskEntity {
		if (task instanceof Task) {
			task = TaskMapper.toEntity(task);
		}

		if (!TimeTaskCommand.timers[task.id]) {
			const taskModel = TaskMapper.toModel(task);

			taskModel.stop((taskUpdated: Task) => {
				const taskEntity = TaskMapper.toEntity(taskUpdated);
				TaskRepository.update(taskEntity);
				TaskTimedEvent.publish({ task: taskEntity });
			});

			return task;
		}

		TimeTaskCommand.timers[task.id].stop((taskUpdated: Task) => {
			const taskEntity = TaskMapper.toEntity(taskUpdated);
			TaskRepository.update(taskEntity);
			TaskTimedEvent.publish({ task: taskEntity });
		});

		delete TimeTaskCommand.timers[task.id];

		return task;
	}

	static stopAllTasks(): void {
		for (const task of Object.values(TimeTaskCommand.timers)) {
			TimeTaskCommand.timers[task.id.get()].stop((taskUpdated: Task) => {
				const taskEntity = TaskMapper.toEntity(taskUpdated);

				TaskRepository.update(taskEntity);
				TaskTimedEvent.publish({ task: taskEntity });
			});

			delete TimeTaskCommand.timers[task.id.get()];
		}
	}
}
