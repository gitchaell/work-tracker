import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { Task } from '@/core/task/domain/Task.entity';

export type TaskUpdatedEventDetail = { task: Task };
export type TaskUpdatedEventListener = (event: CustomEvent<TaskUpdatedEventDetail>) => void;

export class TaskUpdatedEvent {
	static eventName = 'task/updated';

	static publish(detail: TaskUpdatedEventDetail) {
		EventStorage.save({ name: this.eventName, detail });

		document.dispatchEvent(new CustomEvent(this.eventName, { detail }));
	}

	static subscribe(handler: TaskUpdatedEventListener) {
		document.addEventListener(this.eventName, handler as EventListener);
	}

	static unsubscribe(handler: TaskUpdatedEventListener) {
		document.removeEventListener(this.eventName, handler as EventListener);
	}
}
