import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';

export type TaskCreatedEventDetail = { task: TaskEntity };
export type TaskCreatedEventListener = (event: CustomEvent<TaskCreatedEventDetail>) => void;

export class TaskCreatedEvent {
	static eventName = 'task/created';

	static publish(detail: TaskCreatedEventDetail) {
		EventStorage.save({ name: this.eventName, detail });

		document.dispatchEvent(new CustomEvent(this.eventName, { detail }));
	}

	static subscribe(handler: TaskCreatedEventListener) {
		document.addEventListener(this.eventName, handler as EventListener);
	}

	static unsubscribe(handler: TaskCreatedEventListener) {
		document.removeEventListener(this.eventName, handler as EventListener);
	}
}
