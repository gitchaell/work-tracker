import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';

export class FindWorksQuery {
	static execute(): WorkEntity[] {
		return WorkRepository.findAll();
	}
}
