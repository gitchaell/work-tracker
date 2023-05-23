import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { Work } from '@/core/work/domain/Work.entity';

export type WorkDeletedEventDetail = { work: Work };
export type WorkDeletedEventListener = (event: CustomEvent<WorkDeletedEventDetail>) => void;

export class WorkDeletedEvent {
	static eventName = 'work/deleted';

	static publish(detail: WorkDeletedEventDetail) {
		EventStorage.save({ name: this.eventName, detail });

		document.dispatchEvent(new CustomEvent(this.eventName, { detail }));
	}

	static subscribe(handler: WorkDeletedEventListener) {
		document.addEventListener(this.eventName, handler as EventListener);
	}

	static unsubscribe(handler: WorkDeletedEventListener) {
		document.removeEventListener(this.eventName, handler as EventListener);
	}
}
