import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { WorkDeletedEvent } from '@/core/work/application/events/WorkDeleted.event';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';
import { Work } from '@/core/work/domain/Work.model';
import { WorkMapper } from '@/core/work/infrastructure/Work.mapper';

export class DeleteWorkCommand {
	static execute(work: Work | WorkEntity): WorkEntity {
		if (work instanceof Work) {
			work = WorkMapper.toEntity(work);
		}

		const workDeleted = WorkRepository.delete(work);

		WorkDeletedEvent.publish({ work: workDeleted });

		return workDeleted;
	}
}
