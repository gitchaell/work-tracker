import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';

export type TaskDeletedEventDetail = { task: TaskEntity };
export type TaskDeletedEventListener = (event: CustomEvent<TaskDeletedEventDetail>) => void;

export class TaskDeletedEvent {
	static eventName = 'task/deleted';

	static publish(detail: TaskDeletedEventDetail) {
		EventStorage.save({ name: this.eventName, detail });

		document.dispatchEvent(new CustomEvent(this.eventName, { detail }));
	}

	static subscribe(handler: TaskDeletedEventListener) {
		document.addEventListener(this.eventName, handler as EventListener);
	}

	static unsubscribe(handler: TaskDeletedEventListener) {
		document.removeEventListener(this.eventName, handler as EventListener);
	}
}
