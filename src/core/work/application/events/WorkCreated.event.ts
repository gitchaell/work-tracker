import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';

export type WorkCreatedEventDetail = { work: WorkEntity };
export type WorkCreatedEventListener = (event: CustomEvent<WorkCreatedEventDetail>) => void;

export class WorkCreatedEvent {
	static eventName = 'work/created';

	static publish(detail: WorkCreatedEventDetail) {
		EventStorage.save({ name: this.eventName, detail });

		document.dispatchEvent(new CustomEvent(this.eventName, { detail }));
	}

	static subscribe(handler: WorkCreatedEventListener) {
		document.addEventListener(this.eventName, handler as EventListener);
	}

	static unsubscribe(handler: WorkCreatedEventListener) {
		document.removeEventListener(this.eventName, handler as EventListener);
	}
}
