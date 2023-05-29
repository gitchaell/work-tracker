import { Task } from '@/core/task/domain/Task.model';
import { TaskTimedEvent } from '@/core/task/application/events/TaskTimed.event';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';

export class TimeTaskCommand {
	static timers: Record<string, Task> = {};

	static startTask(task: Task): Task {
		this.timers[task.id.get()] = task;
		this.timers[task.id.get()].start((task: Task) => {
			TaskTimedEvent.publish({ task: TaskMapper.toEntity(task) });
		});

		return task;
	}

	static stopTask(task: Task): Task {
		this.timers[task.id.get()].stop((task: Task) => {
			TaskTimedEvent.publish({ task: TaskMapper.toEntity(task) });
		});
		delete this.timers[task.id.get()];

		return task;
	}
}
