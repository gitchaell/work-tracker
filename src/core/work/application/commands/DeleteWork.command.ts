import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { WorkDeletedEvent } from '@/core/work/application/events/WorkDeleted.event';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';

export class DeleteWorkCommand {
	static execute(work: WorkEntity): WorkEntity {
		const workDeleted = WorkRepository.delete(work);

		WorkDeletedEvent.publish({ work: workDeleted });

		return workDeleted;
	}
}
