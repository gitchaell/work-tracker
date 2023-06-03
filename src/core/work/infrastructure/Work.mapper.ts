import { Work } from '@/core/work/domain/Work.model';
import { WorkEntity } from '../domain/entities/Work.entity';
import { CurrencyRepository } from '@/core/currency/infrastructure/Currency.repository';
import { NotFoundError } from '@/core/common/helpers/ErrorHandlers.helper';
import { CurrencyMapper } from '@/core/currency/infrastructure/Currency.mapper';

export class WorkMapper {
	static toEntity(work: Work): WorkEntity {
		return {
			id: work.id.get(),
			title: work.title.get(),
			minSalary: work.minSalary.get(),
			experience: work.experience.get(),
			demand: work.demand.get(),
			profitMargin: {
				perMonth: work.profitMargin.perMonth.get(),
			},
			costs: {
				perMonth: work.costs.perMonth.get(),
			},
			workHours: {
				perDay: work.workHours.perDay.get(),
			},
			workDays: {
				perWeek: work.workDays.perWeek.get(),
			},
			rate: {
				perSecond: work.rate.perSecond.get(),
				perMinute: work.rate.perMinute.get(),
				perHour: work.rate.perHour.get(),
				perDay: work.rate.perDay.get(),
				perWeek: work.rate.perWeek.get(),
				perMonth: work.rate.perMonth.get(),
				perYear: work.rate.perYear.get(),
			},
			createdAt: work.createdAt.get(),
			currencyId: work.currency.id.get(),
		};
	}

	static toModel(workEntity: WorkEntity): Work {
		const currency = CurrencyRepository.findById(workEntity.currencyId);

		if (!currency) {
			throw new NotFoundError('Currency related to Work not found');
		}

		const work = new Work();

		work.id.set(workEntity.id);
		work.title.set(workEntity.title);
		work.minSalary.set(workEntity.minSalary);
		work.experience.set(workEntity.experience);
		work.demand.set(workEntity.demand);
		work.profitMargin.perMonth.set(workEntity.profitMargin.perMonth);
		work.costs.perMonth.set(workEntity.costs.perMonth);
		work.workHours.perDay.set(workEntity.workHours.perDay);
		work.workDays.perWeek.set(workEntity.workDays.perWeek);
		work.rate.perSecond.set(workEntity.rate.perSecond);
		work.rate.perMinute.set(workEntity.rate.perMinute);
		work.rate.perHour.set(workEntity.rate.perHour);
		work.rate.perDay.set(workEntity.rate.perDay);
		work.rate.perWeek.set(workEntity.rate.perWeek);
		work.rate.perMonth.set(workEntity.rate.perMonth);
		work.rate.perYear.set(workEntity.rate.perYear);
		work.createdAt.set(workEntity.createdAt);

		work.setCurrency(CurrencyMapper.toModel(currency));

		work.calculateRate();

		return work;
	}
}
