import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { WorkMapper } from '@/core/work/infrastructure/Work.mapper';
import { WorkCreatedEvent } from '@/core/work/application/events/WorkCreated.event';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';
import { Work } from '@/core/work/domain/Work.model';

export class CreateWorkCommand {
	static execute(work: Work | WorkEntity): WorkEntity {
		if (work instanceof Work) {
			work.calculateRate();
			work = WorkMapper.toEntity(work);
		}

		const workCreated = WorkRepository.create(work);

		WorkCreatedEvent.publish({ work: workCreated });

		return workCreated;
	}
}
