import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { Task } from '@/core/task/domain/Task.entity';

export type TaskTimedEventDetail = { task: Task };
export type TaskTimedEventListener = (event: CustomEvent<TaskTimedEventDetail>) => void;

export class TaskTimedEvent {
	static eventName = 'task/timed';

	static publish(detail: TaskTimedEventDetail) {
		EventStorage.save({ name: this.eventName, detail });

		document.dispatchEvent(new CustomEvent(this.eventName, { detail }));
	}

	static subscribe(handler: TaskTimedEventListener) {
		document.addEventListener(this.eventName, handler as EventListener);
	}

	static unsubscribe(handler: TaskTimedEventListener) {
		document.removeEventListener(this.eventName, handler as EventListener);
	}
}
