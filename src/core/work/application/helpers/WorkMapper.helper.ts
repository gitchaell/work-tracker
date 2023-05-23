import { Work } from '@/core/work/domain/Work.entity';
import { WorkRateCalculator } from './WorkRateCalculator.helper';

export class WorkMapper {
	static toWork(workDTO: Partial<Work>): Work {
		const rate = WorkRateCalculator.calculate(workDTO as Work);

		return {
			id: workDTO.id,
			title: workDTO.title,
			minSalary: workDTO.minSalary,
			experience: workDTO.experience,
			marketDemand: workDTO.marketDemand,
			indirectCostsMonthly: workDTO.indirectCostsMonthly,
			profitMargin: workDTO.profitMargin,
			workHoursPerDay: workDTO.workHoursPerDay,
			workDaysPerWeek: workDTO.workDaysPerWeek,
			currencyId: workDTO.currencyId,
			rate: rate,
			date: new Date().toISOString(),
		} as Work;
	}
}
