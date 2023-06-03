import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { WorkUpdatedEvent } from '@/core/work/application/events/WorkUpdated.event';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';
import { Work } from '@/core/work/domain/Work.model';
import { WorkMapper } from '@/core/work/infrastructure/Work.mapper';

export class UpdateWorkCommand {
	static execute(work: Work | WorkEntity): WorkEntity {
		if (work instanceof Work) {
			work.calculateRate();
			work = WorkMapper.toEntity(work);
		}

		const workUpdated = WorkRepository.update(work);

		WorkUpdatedEvent.publish({ work: workUpdated });

		return workUpdated;
	}
}
