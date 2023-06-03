import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { WorkUpdatedEvent } from '@/core/work/application/events/WorkUpdated.event';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';

export class UpdateWorkCommand {
	static execute(work: WorkEntity): WorkEntity {
		const workUpdated = WorkRepository.update(work);

		WorkUpdatedEvent.publish({ work: workUpdated });

		return workUpdated;
	}
}
