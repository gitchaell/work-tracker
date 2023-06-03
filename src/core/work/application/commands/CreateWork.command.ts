import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { WorkCreatedEvent } from '@/core/work/application/events/WorkCreated.event';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';

export class CreateWorkCommand {
	static execute(work: WorkEntity): WorkEntity {
		const workCreated = WorkRepository.create(work);

		WorkCreatedEvent.publish({ work: workCreated });

		return workCreated;
	}
}
