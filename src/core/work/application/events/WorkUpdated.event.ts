import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { Work } from '@/core/work/domain/Work.entity';

export type WorkUpdatedEventDetail = { work: Work };
export type WorkUpdatedEventListener = (event: CustomEvent<WorkUpdatedEventDetail>) => void;

export class WorkUpdatedEvent {
	static eventName = 'work/updated';

	static publish(detail: WorkUpdatedEventDetail) {
		EventStorage.save({ name: this.eventName, detail });

		document.dispatchEvent(new CustomEvent(this.eventName, { detail }));
	}

	static subscribe(handler: WorkUpdatedEventListener) {
		document.addEventListener(this.eventName, handler as EventListener);
	}

	static unsubscribe(handler: WorkUpdatedEventListener) {
		document.removeEventListener(this.eventName, handler as EventListener);
	}
}
