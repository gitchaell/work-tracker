import { Task } from '@/core/task/domain/Task.model';
import { TaskTimedEvent } from '@/core/task/application/events/TaskTimed.event';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { TaskRepository } from '../../infrastructure/Task.repository';

export class TimeTaskCommand {
	static timers: Record<string, Task> = {};

	static onTimeTask = (taskUpdated: Task) => {
		const taskEntity = TaskMapper.toEntity(taskUpdated);
		TaskRepository.update(taskEntity);
		TaskTimedEvent.publish({ task: taskEntity });
	};

	static startTask(task: Task | TaskEntity): Task {
		if (!(task instanceof Task)) {
			task = TaskMapper.toModel(task);
		}

		TimeTaskCommand.timers[task.id.get()] = task;
		TimeTaskCommand.timers[task.id.get()].start(TimeTaskCommand.onTimeTask);

		return task;
	}

	static stopTask(task: Task | TaskEntity): Task {
		if (!(task instanceof Task)) {
			task = TaskMapper.toModel(task);
		}

		if (!TimeTaskCommand.timers[task.id.get()]) {
			task.stop(TimeTaskCommand.onTimeTask);
			return task;
		}

		TimeTaskCommand.timers[task.id.get()].stop(TimeTaskCommand.onTimeTask);

		delete TimeTaskCommand.timers[task.id.get()];

		return task;
	}

	static stopAllTasks(): void {
		for (const task of Object.values(TimeTaskCommand.timers)) {
			TimeTaskCommand.timers[task.id.get()].stop(TimeTaskCommand.onTimeTask);

			delete TimeTaskCommand.timers[task.id.get()];
		}
	}
}
