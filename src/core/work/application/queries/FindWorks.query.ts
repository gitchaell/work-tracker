import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { Work } from '@/core/work/domain/Work.entity';

export class FindWorksQuery {
	static execute(): Work[] {
		return WorkRepository.findAll();
	}
}
