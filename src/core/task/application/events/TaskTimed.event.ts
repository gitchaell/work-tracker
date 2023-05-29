import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';

export type TaskTimedEventDetail = { task: TaskEntity };
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
